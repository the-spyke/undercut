import { assertCount, assertPredicate } from "../../utils/assertions.js";

export function skip(count) {
	assertCount(count);

	return function* (iterable) {
		let i = 0;

		for (const item of iterable) {
			if (i >= count) {
				yield item;
			} else {
				i += 1;
			}
		}
	};
}

export function skipWhile(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		let doSkip = true;

		for (const item of iterable) {
			if (doSkip) {
				doSkip = predicate(item);

				if (doSkip) {
					continue;
				}
			}

			yield item;
		}
	};
}
