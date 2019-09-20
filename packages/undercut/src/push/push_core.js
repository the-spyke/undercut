import { assertFunctor } from "../utils/assert.js";
import { initializeObserver, tryCloseObserver } from "../utils/observer.js";

export const SKIP = Symbol(`Skip current item in observer chain`);

export function createPushOperation(operation, finalizer) {
	assertFunctor(operation, "operation");
	assertFunctor(finalizer, "finalizer");

	return function* (observer) {
		let error = undefined;
		let index = 0;

		try {
			while (true) {
				const result = operation(yield, index);

				if (result !== SKIP) {
					observer.next(result);
				}

				index++;
			}
		} catch (e) {
			error = e;
			observer.throw(e);
		} finally {
			if (finalizer) {
				const result = finalizer(error, index);

				if (error === undefined && result !== SKIP) {
					observer.next(result);
				}
			}

			tryCloseObserver(observer);
		}
	};
}


export function createPushLine(pipeline, target) {
	return [...pipeline].reverse().reduce((observer, operation) => initializeObserver(operation(observer)), target);
}

export function average_push_example() {
	let sum = 0;

	return createPushOperation(
		item => {
			sum += item;

			return SKIP;
		},
		(e, count) => e ? SKIP : count && sum / count
	);
}
export function reduce_push_example(reducer, initial) {
	let acc = initial;

	return createPushOperation(
		(item, index) => {
			acc = reducer(acc, item, index);

			return SKIP;
		},
		e => e ? SKIP : acc
	);
}
