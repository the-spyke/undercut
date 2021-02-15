import { assert, assertFunctor } from "@undercut/utils/assert";
import { isPositiveOrZero } from "@undercut/utils";

export function skip(count) {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return skipWhile((_, i) => i < count);
}

export function skipWhile(predicate) {
	assertFunctor(predicate, `predicate`);

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
