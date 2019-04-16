import { assertCount } from "../../utils/assertions.js";

export function skip(count) {
	assertCount(count);

	return function* (iterable) {
		let i = 0;

		for (const item of iterable) {
			if (i >= count) {
				yield item;
			} else {
				i += 1;
			}
		}
	};
}
