import { assertSelector } from "../../utils/assertions.js";
import { identity } from "../../utils/function.js";

/**
 * Multisets are not supported.
 */
export const difference = differenceBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function differenceBy(selector, ...sources) {
	assertSelector(selector);

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
	assertSelector(selector);

	return function* (iterable) {
		const infos = new Map();

		scanToMap(infos, selector, iterable);

		for (const source of sources) {
			scanToMap(infos, selector, source);
		}

		for (const key of infos.keys()) {
			const { count, item } = infos.get(key);

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

function scanToMap(infos, selector, source) {
	for (const item of source) {
		const key = selector(item);
		const info = infos.get(key);

		if (info === undefined) {
			infos.set(key, { count: 1, item });
		} else {
			info.count++;
		}
	}
}
