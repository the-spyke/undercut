import { assert } from "@undercut/utils/src/assert.js";
import { identity } from "@undercut/utils/src/function.js";
import { isPositiveOrZero } from "@undercut/utils/src/language.js";

export function buffer(size) {
	assert(isPositiveOrZero(size), `"size" is required, must be a number >= 0.`);

	size = Math.trunc(size);

	if (size < 2) {
		return identity;
	}

	return function* (iterable) {
		const buffer = new Array(size);

		let count = 0;

		for (const item of iterable) {
			if (count < size) {
				buffer[count] = item;
				count++;
			}

			if (count >= size) {
				for (const dataItem of buffer) {
					yield dataItem;
				}

				count = 0;
			}
		}

		for (let index = 0; index < count; index++) {
			yield buffer[index];
		}
	};
}

export function bufferAll() {
	return function* (iterable) {
		const buffer = [...iterable];

		for (const item of buffer) {
			yield item;
		}
	};
}
