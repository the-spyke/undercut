import type { Observer, PushOperation, Selector } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close, identity } from "@undercut/utils";

/**
 * Multisets are not supported.
 */
export const intersection: <T>(...sources: Iterable<T>[]) => PushOperation<T> = intersectionBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function intersectionBy<T, K>(selector: Selector<T, K>, ...sources: Iterable<T>[]): PushOperation<T> {
	assertFunctor(selector, `selector`);

	return asObserver(function* (observer: Observer<T>) {
		try {
			if (!sources.length) {
				return;
			}

			const expectedCount = sources.length;

			let keyCounts: Map<K, number> | null = null;

			while (true) {
				const item: T = yield;
				const key = selector(item);

				if (!keyCounts) {
					keyCounts = countKeys(sources, selector);
				}

				const count = keyCounts.get(key);

				if (count === expectedCount) {
					keyCounts.delete(key);

					observer.next(item);
				}
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}

function countKeys<T, K>(sources: Iterable<T>[], selector: Selector<T, K>): Map<K, number> {
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

	return keyCounts;
}
