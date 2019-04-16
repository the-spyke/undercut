import { assertPredicate } from "../../utils/assertions.js";

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
