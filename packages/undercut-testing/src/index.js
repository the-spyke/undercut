/* eslint-disable jest/no-export */
export function simulatePull(operation, source) {
	return [...operation(source)];
}

/**
 * @param {Generator} operation
 * @param {Iterable} source
 * @returns {Array}
 */
export function simulatePush(operation, source) {
	const result = [];
	const observer = operation(getArrayObserver(result));

	try {
		for (const item of source) {
			observer.next(item);
		}
	} catch (error) {
		observer.throw(error);
	} finally {
		observer.return();
	}

	return result;
}

function getOperationSpy(operationFactory, factoryArgs = null, callbackArgs = null, callbackPosition = 0) {
	if (!Array.isArray(factoryArgs)) {
		return { operation: operationFactory() };
	}

	if (!Array.isArray(callbackArgs)) {
		return { operation: operationFactory(...factoryArgs) };
	}

	const args = [...factoryArgs];
	const spy = jest.fn(args[callbackPosition]);

	args[callbackPosition] = spy;

	return { operation: operationFactory(...args), spy };
}

function testOperation(simulate, operationFactory, { args, source, target, callbackPosition, callbackArgs }) {
	const { operation, spy } = getOperationSpy(operationFactory, args, callbackArgs, callbackPosition);
	const result = simulate(operation, source);

	if (spy) {
		expect(spy.mock.calls).toEqual(callbackArgs);
	} else {
		expect(result).toEqual(target);
	}
}

function checkTestSpec(tester, spec) {
	const allowedProps = new Set([`args`, `source`, ...tester.specProps]);
	const invalidProps = Object.keys(spec).filter(p => !allowedProps.has(p));

	if (invalidProps.length) {
		const type = tester.name.replace(`Tester`, ``);

		throw new Error(
			`Excess props for ${type} tests. \n` +
			`Allowed props: ${[...allowedProps].join(`, `)} \n` +
			`Invalid props: ${invalidProps.join(`, `)}`);
	}
}

function callbackTester({ simulate }, operationFactory, { args, source, callbackPosition, callbackArgs }) {
	const { operation, spy } = getOperationSpy(operationFactory, args, callbackArgs, callbackPosition);

	simulate(operation, source);

	expect(spy.mock.calls).toEqual(callbackArgs);
}

callbackTester.specProps = [`callbackArgs`, `callbackPosition`];

function limitTester({ simulate, asLimitedOp }, operationFactory, { args, source, limit }) {
	const operation = operationFactory(...args);
	const limitedOperation = asLimitedOp(operation, limit);

	expect(() => simulate(limitedOperation, source)).not.toThrow();
}

limitTester.specProps = [`limit`];

function targetTester({ simulate }, operationFactory, { args, source, target }) {
	const operation = operationFactory(...args);
	const result = simulate(operation, source);

	expect(result).toEqual(target);
}

targetTester.specProps = [`target`];

const testers = [
	callbackTester,
	limitTester,
	targetTester,
];

const helpers = {
	pull: {
		simulate: simulatePull,
		asLimitedOp: asLimitedPullOp,
	},
	push: {
		simulate: simulatePush,
		asLimitedOp: asLimitedPushOp,
	}
};

export function createBySpec(type, operationFactory) {
	if (!(type in helpers)) throw new Error(`Unknown test type: ${type}`);
	if (!operationFactory) throw new Error(`"operationFactory" is required`);

	return function bySpec(...testSpecs) {
		if (!testSpecs.length) throw new Error(`"testSpec" is required`);

		return function operationTest() {
			for (const testSpec of testSpecs) {
				const tester = testers.find(t => t.specProps.some(p => p in testSpec));

				if (!tester) throw new Error(`Unknown tester for test spec: ${Object.keys(testSpec)}`);

				checkTestSpec(tester, testSpec);

				tester(helpers[type], operationFactory, testSpec);
			}
		};
	};
}

export const testOperationPull = testOperation.bind(undefined, simulatePull);
export const testOperationPush = testOperation.bind(undefined, simulatePush);

function getArrayObserver(array) {
	return {
		next(value) {
			array.push(value);
		},
		return() {
			// Empty.
		},
		throw(error) {
			throw error;
		},
	};
}

export function getIntegerSource(n) {
	return {
		[Symbol.iterator]: function* () {
			for (let index = 0; index < n; index++) {
				yield index;
			}
		}
	};
}

/**
 * @type {<T>(iterable: Iterable<T>, limit: number) => Iterable<T>}
 */
export function asLimitedSource(iterable, limit) {
	return {
		[Symbol.iterator]: function* () {
			if (!limit) {
				throw new Error(`Exceeded 0 items`);
			}

			let index = 0;

			for (const item of iterable) {
				yield item;
				index++;

				if (index >= limit) {
					throw new Error(`Exceeded ${limit} items`);
				}
			}
		}
	};
}

/**
 * @type {<T extends Function>(operation: T, limit: number) => T}
 */
export function asLimitedPullOp(operation, limit) {
	return function (iterable) {
		return operation(asLimitedSource(iterable, limit));
	};
}

/**
 * @type {<T extends Function>(operation: T, limit: number) => T}
 */
export function asLimitedPushOp(operation, limit) {
	return function (observer) {
		let isOpen = true;

		const opBefore = asObserver(function* (observer) {
			try {
				if (!limit && isOpen) {
					throw new Error(`Observer wasn't closed on initialization in case of 0 items`);
				}

				let index = 0;

				while (true) {
					observer.next(yield);
					index++;

					if (index === limit && isOpen) {
						throw new Error(`Observer wasn't closed right after ${limit} items`);
					}
				}
			} catch (error) {
				abort(observer, error);
			} finally {
				close(observer);
			}
		});

		const opAfter = asObserver(function* (observer) {
			try {
				while (true) {
					observer.next(yield);
				}
			} catch (error) {
				abort(observer, error);
			} finally {
				isOpen = false;
				close(observer);
			}
		});

		return opBefore(operation(opAfter(observer)));
	};
}

function abort(coroutine, error) {
	if (coroutine.throw) {
		coroutine.throw(error);
	}

	throw error;
}

function asObserver(generator) {
	return function (...args) {
		const observer = generator(...args);

		observer.next();

		return observer;
	};
}

function close(coroutine) {
	if (coroutine.return) {
		coroutine.return();
	}
}
