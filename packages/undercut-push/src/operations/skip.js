import { assert, assertFunctor } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close } from "@undercut/utils/src/coroutine.js";
import { isPositiveOrZero } from "@undercut/utils/src/language.js";

export function skip(count) {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return skipWhile((_, i) => i < count);
}

export function skipWhile(predicate) {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer) {
		try {
			let skip = true;
			let index = 0;

			while (true) {
				const item = yield;

				if (skip) {
					skip = predicate(item, index);
					index++;

					if (skip) {
						continue;
					}
				}

				observer.next(item);
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
