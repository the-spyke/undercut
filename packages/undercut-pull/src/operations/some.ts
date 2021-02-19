import type { Predicate, PullOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";

export function some<T>(predicate: Predicate<T>): PullOperation<T, boolean> {
	assertFunctor(predicate, `predicate`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (predicate(item, index)) {
				yield true;

				return;
			}

			index++;
		}

		yield false;
	};
}
