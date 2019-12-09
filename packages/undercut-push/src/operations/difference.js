import { assertFunctor } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";
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

	return asObserver(function* (observer) {
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
export const symmetricDifference = symmetricDifferenceBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function symmetricDifferenceBy(selector, ...sources) {
	assertFunctor(selector, `selector`);

	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);
		const keyInfos = new Map();

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
