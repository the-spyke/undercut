import { assert } from "../../utils/assertions.js";

export function chunk(size) {
	assert(Number.isSafeInteger(size) && size > 0, `"size" is required, must an be integer > 0.`);

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
