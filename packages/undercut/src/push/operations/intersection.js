import { assertFunctor } from "../../utils/assert.js";
import { identity } from "../../utils/function.js";
import { closeObserver } from "../../utils/observer.js";

/**
 * Multisets are not supported.
 */
export const intersection = intersectionBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function intersectionBy(selector, ...sources) {
	assertFunctor(selector, "selector");

	return function* (observer) {
		try {
			if (sources.length === 0) {
				return;
			}

			const expectedCount = sources.length;

			let keyCounts = null;

			while (true) {
				const item = yield;
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
		} catch (e) {
			observer.throw(e);
		} finally {
			closeObserver(observer);
		}
	};
}

function countKeys(sources, selector) {
	const keyCounts = new Map();

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
