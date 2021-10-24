import type { Predicate, PullOperation } from "@undercut/types";

import { assert, assertFunctor } from "@undercut/utils/assert";
import { isPositiveOrZero } from "@undercut/utils";

export function take<T>(count: number): PullOperation<T> {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return function* (iterable) {
		if (!count) {
			return;
		}

		let index = 0;

		for (const item of iterable) {
			yield item;
			index++;

			if (index >= count) {
				return;
			}
		}
	};
}

export function takeWhile<T>(predicate: Predicate<T>): PullOperation<T> {
	assertFunctor(predicate, `predicate`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (!predicate(item, index)) {
				return;
			}

			yield item;
			index++;
		}
	};
}
