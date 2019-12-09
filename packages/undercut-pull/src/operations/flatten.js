import { assert } from "@undercut/utils/src/assert.js";
import { isIterable, isPositiveOrZero } from "@undercut/utils/src/language.js";

function* spreadRec(canSpread, maxDepth, currentDepth, value) {
	if (currentDepth < maxDepth && canSpread(value)) {
		for (const item of value) {
			yield* spreadRec(canSpread, maxDepth, currentDepth + 1, item);
		}
	} else {
		yield value;
	}
}

function flattenCore(canSpread, depth) {
	assert(isPositiveOrZero(depth), `"depth" is required, must be a number >= 0.`);

	depth = Math.trunc(depth);

	return function* (iterable) {
		for (const item of iterable) {
			yield* spreadRec(canSpread, depth, 0, item);
		}
	};
}

export function flatten(depth = 1) {
	return flattenCore(Array.isArray, depth);
}

export function flattenIterables(depth = 1) {
	return flattenCore(isIterable, depth);
}
