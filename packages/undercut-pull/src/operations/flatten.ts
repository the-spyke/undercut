import type { RecPredicate, PullOperation, Predicate } from "@undercut/types";

import { assert, assertFunctor } from "@undercut/utils/assert";
import { identity, isIterable, isPositiveOrZero } from "@undercut/utils";

import { flatMap } from "./flat_map";

export function flatten<T>(predicate: RecPredicate<T>, depth = 1): PullOperation<T> {
	assert(isPositiveOrZero(depth), `"depth" is required, must be a number >= 0.`);

	depth = Math.trunc(depth);

	if (depth < 1) {
		return identity;
	}

	if (depth < 2) {
		return flatten1(predicate);
	}

	return flatMap<T>((item, index, itemDepth): item is Iterable<T> => itemDepth < depth && predicate(item, index, itemDepth));
}

export function flattenArrays(depth = 1) {
	return flatten(Array.isArray, depth);
}

export function flattenIterables(depth = 1) {
	return flatten(isIterable, depth);
}

function flatten1<T>(predicate: RecPredicate<T>): PullOperation<T> {
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
