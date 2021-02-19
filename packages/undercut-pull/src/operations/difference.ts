import type { Action, PullOperation, Selector } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { identity } from "@undercut/utils";

type KeyInfo<T> = { count: number, item: T };

/**
 * Multisets are not supported.
 */
export const difference = differenceBy.bind(undefined, identity) as <T>(...sources: Array<Iterable<T>>) => PullOperation<T>;

/**
 * Multisets are not supported.
 */
export function differenceBy<T, K>(selector: Selector<T, K>, ...sources: Array<Iterable<T>>): PullOperation<T> {
	assertFunctor(selector, `selector`);

	return function* (iterable) {
		const keys = new Set<K>();

		for (const source of sources) {
			scanToSet(keys, selector, source);
		}

		for (const item of iterable) {
			const key = selector(item);

			if (!keys.has(key)) {
				yield item;
			}
		}
	};
}

/**
 * Multisets are not supported.
 */
export const symmetricDifference = symmetricDifferenceBy.bind(undefined, identity) as <T>(...sources: Array<Iterable<T>>) => PullOperation<T>;

/**
 * Multisets are not supported.
 */
export function symmetricDifferenceBy<T, K>(selector: Selector<T, K>, ...sources: Array<Iterable<T>>): PullOperation<T> {
	assertFunctor(selector, `selector`);

	return function* (iterable) {
		const keyInfos = new Map<K, KeyInfo<T>>();

		scanToMap(keyInfos, selector, iterable);

		for (const source of sources) {
			scanToMap(keyInfos, selector, source);
		}

		for (const { count, item } of keyInfos.values()) {
			if (count % 2 > 0) {
				yield item;
			}
		}
	};
}

function scanToSet<T, R>(keys: Set<R>, selector: Selector<T, R>, source: Iterable<T>): void {
	for (const item of source) {
		const key = selector(item);

		if (!keys.has(key)) {
			keys.add(key);
		}
	}
}

function scanToMap<T, R>(keyInfos: Map<R, KeyInfo<T>>, selector: Selector<T, R>, source: Iterable<T>): void {
	for (const item of source) {
		const key = selector(item);
		const info = keyInfos.get(key);

		if (info === undefined) {
			keyInfos.set(key, { count: 1, item });
		} else {
			info.count++;
		}
	}
}
