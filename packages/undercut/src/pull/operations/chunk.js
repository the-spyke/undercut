import { assert } from "../../utils/assertions.js";
import { isNumber } from "../../utils/lang.js";

export function chunk(size) {
	assert(isNumber(size) && size > 0, "Size is required and must be > 0.");

	return function* (iterable) {
		let chunk = [];

		for (const item of iterable) {
			if (chunk.length < size) {
				chunk.push(item);
			}

			if (chunk.length >= size) {
				yield chunk;

				chunk = [];
			}
		}

		if (chunk.length > 0) {
			yield chunk;
		}
	};
}
