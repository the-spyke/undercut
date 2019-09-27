import { assert } from "../../utils/assert.js";
import { isFunction } from "../../utils/language.js";
import { tryCloseObserver } from "../../utils/observer.js";

export function forEach(action) {
	assert(isFunction(action), `"action" is required, must be a function.`);

	return function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item = yield;

				action(item, index);
				observer.next(item);

				index++;
			}
		} finally {
			tryCloseObserver(observer);
		}
	};
}
