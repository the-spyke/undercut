import { assert } from "../../utils/assertions.js";

export function nth(n) {
	assert(Number.isFinite(n) && n >= 0, "N is required and must be >= 0.");

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
