import { assert } from "@undercut/utils/src/assert.js";
import { isPositive } from "@undercut/utils/src/language.js";

export function chunk(size) {
	assert(isPositive(size) && size >= 1, `"size" is required, must be a number >= 1.`);

	size = Math.trunc(size);

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
