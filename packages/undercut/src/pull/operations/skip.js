import { assertCount, assertFunctor } from "../../utils/assertions.js";

export function skip(count) {
	assertCount(count);

	return skipWhile((_, i) => i < count);
}

export function skipWhile(predicate) {
	assertFunctor(predicate, "predicate");

	return function* (iterable) {
		let doSkip = true;
		let index = 0;

		for (const item of iterable) {
			if (doSkip) {
				doSkip = predicate(item, index);
				index++;

				if (doSkip) {
					continue;
				}
			}

			yield item;
		}
	};
}
