import type { Narrower, Predicate, PullOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";

function remove<T, R extends T>(predicate: Narrower<T, R>): PullOperation<T, Exclude<T, R>>;
function remove<T>(predicate: Predicate<T>): PullOperation<T>;
function remove<T, R extends T>(predicate: Narrower<T, R> | Predicate<T>): PullOperation<T, Exclude<T, R>> {
	assertFunctor(predicate, `predicate`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (!predicate(item, index)) {
				yield item as Exclude<T, R>;
			}

			index++;
		}
	};
}

export { remove };
