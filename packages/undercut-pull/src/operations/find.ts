import type { Predicate, PullOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";

function findCore<T>(predicate: Predicate<T>, isIndex: boolean): PullOperation<T, T | number> {
	assertFunctor(predicate, `predicate`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (predicate(item, index)) {
				yield isIndex ? index : item;

				return;
			}

			index++;
		}
	};
}

export function find<T>(predicate: Predicate<T>) {
	return findCore(predicate, false) as PullOperation<T>;
}

export function findIndex<T>(predicate: Predicate<T>) {
	return findCore(predicate, true) as PullOperation<T, number>;
}
