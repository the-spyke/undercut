import type { Observer, PushOperation, Selector } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close, Cohort, identity } from "@undercut/utils";

type KeyInfo<T> = { count: number, item: T };

/**
 * Multisets are not supported.
 */
export const difference: <T>(...sources: Iterable<T>[]) => PushOperation<T> = differenceBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function differenceBy<T, K>(selector: Selector<T, K>, ...sources: Iterable<T>[]): PushOperation<T> {
	assertFunctor(selector, `selector`);

	return asObserver(function* (observer: Observer<T>) {
		try {
			let keys = null;

			while (true) {
				const item: T = yield;
				const key: K = selector(item);

				if (!keys) {
					keys = new Set<K>();

					for (const source of sources) {
						scanToSet(keys, selector, source);
					}
				}

				if (!keys.has(key)) {
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

/**
 * Multisets are not supported.
 */
export const symmetricDifference: <T>(...sources: Iterable<T>[]) => PushOperation<T> = symmetricDifferenceBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function symmetricDifferenceBy<T, K>(selector: Selector<T, K>, ...sources: Iterable<T>[]): PushOperation<T> {
	assertFunctor(selector, `selector`);

	return asObserver(function* (observer: Observer<T>) {
		const cohort = Cohort.of(observer);
		const keyInfos = new Map<K, KeyInfo<T>>();

		try {
			while (true) {
				updateKeyInfos(keyInfos, selector, yield);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (const source of sources) {
						for (const item of source) {
							updateKeyInfos(keyInfos, selector, item);
						}
					}

					for (const { count, item } of keyInfos.values()) {
						if (count % 2 > 0) {
							observer.next(item);
						}
					}
				}
			});
		}
	});
}

function scanToSet<T, K>(keys: Set<K>, selector: Selector<T, K>, source: Iterable<T>): void {
	for (const item of source) {
		const key = selector(item);

		if (!keys.has(key)) {
			keys.add(key);
		}
	}
}

function updateKeyInfos<T, K>(keyInfos: Map<K, KeyInfo<T>>, selector: Selector<T, K>, item: T): void {
	const key = selector(item);
	const info = keyInfos.get(key);

	if (info === undefined) {
		keyInfos.set(key, { count: 1, item });
	} else {
		info.count++;
	}
}
