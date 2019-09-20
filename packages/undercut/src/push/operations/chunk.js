import { assert } from "../../utils/assert.js";
import { isPositive } from "../../utils/language.js";
import { tryCloseObserver } from "../../utils/observer.js";

export function chunk(size) {
	assert(isPositive(size) && size >= 1, `"size" is required, must be a number >= 1.`);

	size = Math.trunc(size);

	return function* (observer) {
		let success = true;
		let chunk = [];

		try {
			while (true) {
				while (chunk.length < size) {
					chunk.push(yield);
				}

				observer.next(chunk);
				chunk = [];
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success && chunk.length > 0) {
				observer.next(chunk);
			}

			tryCloseObserver(observer);
		}
	};
}
