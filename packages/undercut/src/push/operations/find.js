import { assertFunctor } from "../../utils/assert.js";
import { closeObserver } from "../../utils/observer.js";

function findCore(predicate, isIndex) {
	assertFunctor(predicate, "predicate");

	return function* (observer) {
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
		} catch (e) {
			observer.throw(e);
		} finally {
			closeObserver(observer);
		}
	};
}

export function find(predicate) {
	return findCore(predicate, false);
}

export function findIndex(predicate) {
	return findCore(predicate, true);
}
