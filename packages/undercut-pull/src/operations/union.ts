import type { PullOperation, Selector } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { identity } from "@undercut/utils";

/**
 * Multisets are not supported.
 */
export const union = unionBy.bind(undefined, identity) as <T>(...sources: Array<Iterable<T>>) => PullOperation<T>;

/**
 * Multisets are not supported.
 */
export function unionBy<T, K>(selector: Selector<T, K>, ...sources: Array<Iterable<T>>): PullOperation<T> {
	assertFunctor(selector, `selector`);

	return function* (iterable) {
		const keys = new Set<K>();

		yield* scanSource(keys, selector, iterable);

		for (const source of sources) {
			yield* scanSource(keys, selector, source);
		}
	};
}

function* scanSource<T, K>(keys: Set<K>, selector: Selector<T, K>, source: Iterable<T>): Iterable<T> {
	for (const item of source) {
		const key = selector(item);

		if (!keys.has(key)) {
			keys.add(key);

			yield item;
		}
	}
}
