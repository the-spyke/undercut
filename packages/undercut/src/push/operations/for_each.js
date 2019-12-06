import { assert } from "../../utils/assert.js";
import { abort, asObserver, close } from "../../utils/coroutine.js";
import { isFunction } from "../../utils/language.js";

export function forEach(action) {
	assert(isFunction(action), `"action" is required, must be a function.`);

	return asObserver(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item = yield;

				action(item, index);
				observer.next(item);

				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
