import type { Observer, PullOperation, PushOperation } from "@undercut/types";

import { abort, asObserverFactory, close } from "@undercut/utils";

import { createBySpecFactory, testOperation } from "./test_operation";
import { getArrayObserver } from "./utils";

export function simulatePull<T, R = T>(operation: PullOperation<T, R>, source: Iterable<T>): Array<R> {
	return [...operation(source)];
}

export function simulatePush<T, R = T>(operation: PushOperation<T, R>, source: Iterable<T>): Array<R> {
	const result: Array<R> = [];
	const observer = operation(getArrayObserver(result));

	try {
		for (const item of source) {
			observer.next(item);
		}
	} catch (error) {
		observer.throw?.(error);
	} finally {
		observer.return?.();
	}

	return result;
}

export const testOperationPull = testOperation.bind(undefined, simulatePull as any);
export const testOperationPush = testOperation.bind(undefined, simulatePush as any);

export function createTestOperation(type: `pull` | `push`) {
	if (type === `pull`) return testOperationPull;
	if (type === `push`) return testOperationPush;

	throw new Error(`Unknown operation type: ${type}`);
}

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

export function getIntegerSource(n: number) {
	return {
		[Symbol.iterator]: function* () {
			for (let index = 0; index < n; index++) {
				yield index;
			}
		}
	};
}

export function asLimitedSource<T>(iterable: Iterable<T>, limit: number): Iterable<T> {
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

export function asLimitedPullOp<T, R = T>(operation: PullOperation<T, R>, limit: number): PullOperation<T, R> {
	return function (iterable) {
		return operation(asLimitedSource(iterable, limit));
	};
}

export function asLimitedPushOp<T, R = T>(operation: PushOperation<T, R>, limit: number): PushOperation<T, R> {
	return function (targetObserver: Observer<R>): Observer<T> {
		let isOpen = true;

		const opBefore = asObserverFactory(function* (observer: Observer<T>): Observer<T> {
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

		const opAfter = asObserverFactory(function* (observer: Observer<R>): Observer<R> {
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

		return opBefore(operation(opAfter(targetObserver)));
	};
}
