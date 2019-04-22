import { assertCount, assertPredicate } from "../../utils/assertions.js";

export function take(count) {
	assertCount(count);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			index++;

			if (index > count) {
				return;
			}

			yield item;
		}
	};
}

export function takeWhile(predicate) {
	assertPredicate(predicate);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (predicate(item, index)) {
				yield item;
			} else {
				return;
			}

			index++;
		}
	};
}
