import type { PullOperation, Reducer } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";

export function reduce<T, R>(reducer: Reducer<T, R>, initial: R): PullOperation<T, R> {
	assertFunctor(reducer, `reducer`);

	return function* (iterable) {
		let acc = initial;
		let index = 0;

		for (const item of iterable) {
			acc = reducer(acc, item, index);
			index++;
		}

		yield acc;
	};
}
