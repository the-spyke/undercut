import { assert } from "../../utils/assert.js";
import { abort, asObserver, close } from "../../utils/coroutine.js";
import { isPositiveOrZero } from "../../utils/language.js";

export function nth(n) {
	assert(isPositiveOrZero(n), `"n" is required, must be a number >= 0.`);

	n = Math.trunc(n);

	return asObserver(function* (observer) {
		try {
			let index = -1;
			let item;

			do {
				item = yield;
				index++;
			} while (index !== n);

			observer.next(item);
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
