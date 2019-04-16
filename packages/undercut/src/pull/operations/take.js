import { assert } from "../../utils/assertions.js";
import { isNumber } from "../../utils/lang.js";

export function take(count) {
	assert(isNumber(count) && count >= 0, "Count is required and must be >= 0");

	return function* (iterable) {
		let i = 0;

		for (const item of iterable) {
			i += 1;

			if (i > count) {
				return;
			}

			yield item;
		}
	};
}
