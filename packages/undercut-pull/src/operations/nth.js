import { assert } from "@undercut/utils/src/assert.js";
import { isPositiveOrZero } from "@undercut/utils/src/language.js";

export function nth(n) {
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
