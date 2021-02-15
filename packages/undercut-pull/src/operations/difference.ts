import { assertFunctor } from "@undercut/utils/src/assert.js";
import { identity } from "@undercut/utils/src/function.js";

/**
 * Multisets are not supported.
 */
export const difference = differenceBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function differenceBy(selector, ...sources) {
	assertFunctor(selector, `selector`);

	return function* (iterable) {
		const keys = new Set();

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
export const symmetricDifference = symmetricDifferenceBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function symmetricDifferenceBy(selector, ...sources) {
	assertFunctor(selector, `selector`);

	return function* (iterable) {
		const keyInfos = new Map();

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

function scanToSet(keys, selector, source) {
	for (const item of source) {
		const key = selector(item);

		if (!keys.has(key)) {
			keys.add(key);
		}
	}
}

function scanToMap(keyInfos, selector, source) {
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
