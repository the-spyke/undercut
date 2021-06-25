import { assert } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close } from "@undercut/utils/src/coroutine.js";
import { isFunction } from "@undercut/utils/src/language.js";

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
