import { assert } from "../../utils/assert.js";
import { abort, asObserver, close } from "../../utils/coroutine.js";
import { isFunction } from "../../utils/language.js";

export function map(mapper) {
	assert(isFunction(mapper), `"mapper" is required, must be a function.`);

	return asObserver(function* (observer) {
		try {
			let index = 0;

			while (true) {
				observer.next(mapper(yield, index));
				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
