import { assertCount, assertPredicate } from "../../utils/assertions.js";

export function skip(count) {
	assertCount(count);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (index >= count) {
				yield item;
			} else {
				index++;
			}
		}
	};
}

export function skipWhile(predicate) {
	assertPredicate(predicate);

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
