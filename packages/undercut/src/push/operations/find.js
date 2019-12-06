import { assertFunctor } from "../../utils/assert.js";
import { abort, asObserver, close } from "../../utils/coroutine.js";

function findCore(predicate, isIndex) {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item = yield;

				if (predicate(item, index)) {
					observer.next(isIndex ? index : item);

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

export function find(predicate) {
	return findCore(predicate, false);
}

export function findIndex(predicate) {
	return findCore(predicate, true);
}
