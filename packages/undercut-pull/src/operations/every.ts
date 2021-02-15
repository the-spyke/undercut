import { assertFunctor } from "@undercut/utils/src/assert.js";

export function every(predicate) {
	assertFunctor(predicate, `predicate`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (!predicate(item, index)) {
				yield false;

				return;
			}

			index++;
		}

		yield true;
	};
}
