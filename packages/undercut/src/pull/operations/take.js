import { assertCount } from "../../utils/assertions.js";

export function take(count) {
	assertCount(count);

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
