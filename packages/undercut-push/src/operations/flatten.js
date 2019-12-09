import { assert } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close } from "@undercut/utils/src/coroutine.js";
import { isIterable, isPositiveOrZero } from "@undercut/utils/src/language.js";

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

	return asObserver(function* (observer) {
		try {
			while (true) {
				spreadRec(observer, canSpread, depth, 0, yield);
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}

export function flatten(depth = 1) {
	return flattenCore(Array.isArray, depth);
}

export function flattenIterables(depth = 1) {
	return flattenCore(isIterable, depth);
}
