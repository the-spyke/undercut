import { assert } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close } from "@undercut/utils/src/coroutine.js";
import { isFunction } from "@undercut/utils/src/language.js";

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
