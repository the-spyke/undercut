import { assert, assertFunctor } from "@undercut/utils/src/assert.js";
import { identity } from "@undercut/utils/src/function.js";
import { isIterable, isPositiveOrZero } from "@undercut/utils/src/language.js";

import { flatMap } from "./flat_map.js";

export function flatten(predicate, depth = 1) {
	assert(isPositiveOrZero(depth), `"depth" is required, must be a number >= 0.`);

	depth = Math.trunc(depth);

	if (depth < 1) {
		return identity;
	}

	if (depth < 2) {
		return flatten1(predicate);
	}

	return flatMap((item, index, itemDepth) => itemDepth < depth && predicate(item, index, itemDepth));
}

export function flattenArrays(depth = 1) {
	return flatten(Array.isArray, depth);
}

export function flattenIterables(depth = 1) {
	return flatten(isIterable, depth);
}

function flatten1(predicate) {
	assertFunctor(predicate, `predicate`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			if (predicate(item, index, 0)) {
				for (const childItem of item) {
					yield childItem;
				}
			} else {
				yield item;
			}

			index++;
		}
	};
}
