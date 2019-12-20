import { createBySpecFactory, testOperation } from "./test_operation.js";
import { abort, asObserver, close, getArrayObserver } from "./utils.js";

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

export const testOperationPull = testOperation.bind(undefined, simulatePull);
export const testOperationPush = testOperation.bind(undefined, simulatePush);

export const createBySpec = createBySpecFactory({
	pull: {
		simulate: simulatePull,
		asLimitedOp: asLimitedPullOp,
	},
	push: {
		simulate: simulatePush,
		asLimitedOp: asLimitedPushOp,
	}
});

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
