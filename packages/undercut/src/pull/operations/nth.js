import { assert } from "../../utils/assert.js";

export function nth(n) {
	assert(Number.isSafeInteger(n) && n >= 0, `"n" is required, must be an integer >= 0.`);

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
