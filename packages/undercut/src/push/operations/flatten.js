import { assert } from "../../utils/assert.js";
import { isIterable, isPositiveOrZero } from "../../utils/language.js";
import { closeObserver } from "../../utils/observer.js";

function spreadRec(observer, canSpread, maxDepth, currentDepth, value) {
	if (currentDepth < maxDepth && canSpread(value)) {
		for (const item of value) {
			spreadRec(observer, canSpread, maxDepth, currentDepth + 1, item);
		}
	} else {
		observer.next(value);
	}
}

function flattenCore(canSpread, depth) {
	assert(isPositiveOrZero(depth), `"depth" is required, must be a number >= 0.`);

	depth = Math.trunc(depth);

	return function* (observer) {
		try {
			while (true) {
				spreadRec(observer, canSpread, depth, 0, yield);
			}
		} catch (e) {
			observer.throw(e);
		} finally {
			closeObserver(observer);
		}
	};
}

export function flatten(depth = 1) {
	return flattenCore(Array.isArray, depth);
}

export function flattenIterables(depth = 1) {
	return flattenCore(isIterable, depth);
}
