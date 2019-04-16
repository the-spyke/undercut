import { assert } from "../../utils/assertions.js";
import { isNumber } from "../../utils/lang.js";

export function nth(n) {
	assert(isNumber(n) && n >= 0, "N is required and must be >= 0.");

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (index === n) {
				yield item;

				return;
			}

			index += 1;
		}
	};
}
