import { assertFunctor } from "../../utils/assert.js";
import { identity } from "../../utils/function.js";

/**
 * Multisets are not supported.
 */
export const union = unionBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function unionBy(selector, ...sources) {
	assertFunctor(selector, "selector");

	return function* (iterable) {
		const keys = new Set();

		yield* scanSource(keys, selector, iterable);

		for (const source of sources) {
			yield* scanSource(keys, selector, source);
		}
	};
}

function* scanSource(keys, selector, source) {
	for (const item of source) {
		const key = selector(item);

		if (!keys.has(key)) {
			keys.add(key);

			yield item;
		}
	}
}
