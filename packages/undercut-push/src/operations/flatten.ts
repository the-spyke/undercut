import type { PushOperation, RecNarrower } from "@undercut/types";

import { assert, assertFunctor } from "@undercut/utils/assert";
import { abort, close, identity, isIterable, isPositiveOrZero } from "@undercut/utils";

import { asPushOperation } from "../push_core";

import { flatMap } from "./flat_map";

export function flatten<T>(predicate: RecNarrower<T>, depth = 1): PushOperation<T> {
	assert(isPositiveOrZero(depth), `"depth" is required, must be a number >= 0.`);

	depth = Math.trunc(depth);

	if (depth < 1) {
		return identity;
	}

	if (depth < 2) {
		return flatten1(predicate);
	}

	return flatMap((item, index, itemDepth): item is Iterable<T> => itemDepth < depth && predicate(item, index, itemDepth));
}

export function flattenArrays<T>(depth = 1): PushOperation<T> {
	return flatten(Array.isArray, depth);
}

export function flattenIterables<T>(depth = 1): PushOperation<T> {
	return flatten(isIterable, depth);
}

function flatten1<T>(predicate: RecNarrower<T>): PushOperation<T> {
	assertFunctor(predicate, `predicate`);

	return asPushOperation<T>(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item: T = yield;

				if (predicate(item, index, 0)) {
					for (const childItem of item) {
						observer.next(childItem);
					}
				} else {
					observer.next(item);
				}

				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
