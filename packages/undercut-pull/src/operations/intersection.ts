import type { PullOperation, Selector } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { identity } from "@undercut/utils";

/**
 * Multisets are not supported.
 */
export const intersection = intersectionBy.bind(undefined, identity) as <T>(...sources: Array<Iterable<T>>) => PullOperation<T>;

/**
 * Multisets are not supported.
 */
export function intersectionBy<T, K>(selector: Selector<T, K>, ...sources: Array<Iterable<T>>): PullOperation<T> {
	assertFunctor(selector, `selector`);

	return function* (iterable) {
		if (sources.length === 0) {
			return;
		}

		const keyCounts = new Map<K, number>();

		for (const item of sources[0]) {
			const key = selector(item);

			keyCounts.set(key, 1);
		}

		for (let i = 1; i < sources.length; i++) {
			const source = sources[i];
			const nextCount = i + 1;

			for (const item of source) {
				const key = selector(item);
				const count = keyCounts.get(key);

				if (count === i) {
					keyCounts.set(key, nextCount);
				}
			}
		}

		const expectedCount = sources.length;

		for (const item of iterable) {
			const key = selector(item);
			const count = keyCounts.get(key);

			if (count === expectedCount) {
				keyCounts.delete(key);

				yield item;
			}
		}
	};
}
