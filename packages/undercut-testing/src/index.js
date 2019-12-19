export function testPull(operation, source) {
	return [...operation(source)];
}

export function testPullLimited(operation, source, limit) {
	return testPull(asLimitedPullOp(operation, limit), source);
}

/**
 * @param {Generator} operation
 * @param {Iterable} source
 * @returns {Array}
 */
export function testPush(operation, source) {
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

export function testPushLimited(operation, source, limit) {
	return testPush(asLimitedPushOp(operation, limit), source);
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

function testOperation(executor, operationFactory, { args, source, target, callbackPosition, callbackArgs }) {
	const { operation, spy } = getOperationSpy(operationFactory, args, callbackArgs, callbackPosition);

	expect(executor(operation, source)).toEqual(target);

	if (spy) {
		expect(spy.mock.calls).toEqual(callbackArgs);
	}
}

export const testOperationPull = testOperation.bind(undefined, testPull);
export const testOperationPush = testOperation.bind(undefined, testPush);

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
		* [Symbol.iterator]() {
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
		* [Symbol.iterator]() {
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
