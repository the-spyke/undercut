import { assert } from "@undercut/utils/src/assert.js";
import { isIterable, isPositiveOrZero } from "@undercut/utils/src/language.js";

function* flattenRec(canFlatten, maxDepth, currentDepth, iterable) {
	for (const item of iterable) {
		if (currentDepth < maxDepth && canFlatten(item)) {
			yield* flattenRec(canFlatten, maxDepth, currentDepth + 1, item);
		} else {
			yield item;
		}
	}
}

function flattenCore(canFlatten, depth) {
	assert(isPositiveOrZero(depth), `"depth" is required, must be a number >= 0.`);

	depth = Math.trunc(depth);

	return function (iterable) {
		return flattenRec(canFlatten, depth, 0, iterable);
	};
}

export function flatten(depth = 1) {
	return flattenCore(Array.isArray, depth);
}

export function flattenIterables(depth = 1) {
	return flattenCore(isIterable, depth);
}
