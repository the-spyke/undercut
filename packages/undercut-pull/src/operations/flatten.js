import { assert, assertFunctor } from "@undercut/utils/src/assert.js";
import { identity } from "@undercut/utils/src/function.js";
import { getRecursiveMapper } from "@undercut/utils/src/iterable.js";
import { isPositiveOrZero } from "@undercut/utils/src/language.js";

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

export function flatMap(predicate, mapper) {
	const recursiveMapper = getRecursiveMapper(predicate, mapper);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			const childItems = recursiveMapper(item, index);

			for (const childItem of childItems) {
				yield childItem;
			}

			index++;
		}
	};
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
