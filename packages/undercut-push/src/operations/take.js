import { assert, assertFunctor } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close } from "@undercut/utils/src/coroutine.js";
import { isPositiveOrZero } from "@undercut/utils/src/language.js";

export function take(count) {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return asObserver(function* (observer) {
		try {
			if (!count) {
				return;
			}

			let index = 0;

			while (true) {
				observer.next(yield);
				index++;

				if (index >= count) {
					return;
				}
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}

export function takeWhile(predicate) {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item = yield;

				if (!predicate(item, index)) {
					return;
				}

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
