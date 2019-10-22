import { assertFunctor } from "../../utils/assert.js";
import { identity } from "../../utils/function.js";
import { closeObserver } from "../../utils/observer.js";

/**
 * Multisets are not supported.
 */
export const difference = differenceBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function differenceBy(selector, ...sources) {
	assertFunctor(selector, `selector`);

	return function* (observer) {
		try {
			let keys = null;

			while (true) {
				const item = yield;
				const key = selector(item);

				if (!keys) {
					keys = new Set();

					for (const source of sources) {
						scanToSet(keys, selector, source);
					}
				}

				if (!keys.has(key)) {
					observer.next(item);
				}
			}
		} catch (e) {
			observer.throw(e);
		} finally {
			closeObserver(observer);
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

	return function* (observer) {
		const keyInfos = new Map();

		let success = true;

		try {
			while (true) {
				updateKeyInfos(keyInfos, selector, yield);
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
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

			closeObserver(observer);
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

function updateKeyInfos(keyInfos, selector, item) {
	const key = selector(item);
	const info = keyInfos.get(key);

	if (info === undefined) {
		keyInfos.set(key, { count: 1, item });
	} else {
		info.count++;
	}
}
