import { assertFunctor } from "../../utils/assert.js";

function findCore(predicate, isIndex) {
	assertFunctor(predicate, `predicate`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (predicate(item, index)) {
				yield isIndex ? index : item;

				return;
			}

			index++;
		}
	};
}

export function find(predicate) {
	return findCore(predicate, false);
}

export function findIndex(predicate) {
	return findCore(predicate, true);
}
