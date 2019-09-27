import { assert } from "../../utils/assert.js";
import { isPositiveOrZero } from "../../utils/language.js";
import { tryCloseObserver } from "../../utils/observer.js";

export function nth(n) {
	assert(isPositiveOrZero(n), `"n" is required, must be a number >= 0.`);

	n = Math.trunc(n);

	return function* (observer) {
		try {
			let index = -1;
			let item;

			do {
				item = yield;
				index++;
			} while (index !== n);

			observer.next(item);
		} finally {
			tryCloseObserver(observer);
		}
	};
}
