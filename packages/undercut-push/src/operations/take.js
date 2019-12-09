import { assert, assertFunctor } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close } from "@undercut/utils/src/coroutine.js";
import { isPositiveOrZero } from "@undercut/utils/src/language.js";

export function take(count) {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return takeWhile((_, i) => i < count);
}

export function takeWhile(predicate) {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item = yield;

				if (predicate(item, index)) {
					observer.next(item);
				} else {
					return;
				}

				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
