import type { RecPredicate, PullOperation } from "@undercut/types";

import { assert, assertFunctor } from "@undercut/utils/assert";
import { identity, isIterable, isPositiveOrZero } from "@undercut/utils";

import { flatMap } from "./flat_map";

export function flatten<T, R>(predicate: RecPredicate<R, T>, depth = 1): PullOperation<T, R> {
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

export function flattenIterables<T>(depth = 1) {
	return flatten<Iterable<T> | T, T>(isIterable as RecPredicate<Iterable<T> | T, T>, depth);
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
