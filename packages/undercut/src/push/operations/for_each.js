import { assert } from "../../utils/assert.js";
import { isFunction } from "../../utils/language.js";
import { closeObserver } from "../../utils/observer.js";

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
			closeObserver(observer);
		}
	};
}
