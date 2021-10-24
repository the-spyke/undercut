import type { PullOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { isPositiveOrZero } from "@undercut/utils";

export function nth<T>(n: number): PullOperation<T> {
	assert(isPositiveOrZero(n), `"n" is required, must be a number >= 0.`);

	n = Math.trunc(n);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (index === n) {
				yield item;

				return;
			}

			index++;
		}
	};
}
