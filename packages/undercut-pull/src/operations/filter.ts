import type { Narrower, Predicate, PullOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";

function filter<T, R extends T>(narrower: Narrower<T, R>): PullOperation<T, R>;
function filter<T>(predicate: Predicate<T>): PullOperation<T>;
function filter<T, R extends T>(predicate: Narrower<T, R> | Predicate<T>): PullOperation<T, R> {
	assertFunctor(predicate, `predicate`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (predicate(item, index)) {
				yield item;
			}

			index++;
		}
	};
}

export { filter };
