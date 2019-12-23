import { assert } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close } from "@undercut/utils/src/coroutine.js";
import { isIterable, isPositiveOrZero } from "@undercut/utils/src/language.js";

function flattenRec(observer, canFlatten, maxDepth, currentDepth, item) {
	if (currentDepth < maxDepth && canFlatten(item)) {
		for (const nextItem of item) {
			flattenRec(observer, canFlatten, maxDepth, currentDepth + 1, nextItem);
		}
	} else {
		observer.next(item);
	}
}

function flattenCore(canFlatten, depth) {
	assert(isPositiveOrZero(depth), `"depth" is required, must be a number >= 0.`);

	depth = Math.trunc(depth);

	return asObserver(function* (observer) {
		try {
			while (true) {
				flattenRec(observer, canFlatten, depth, 0, yield);
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
