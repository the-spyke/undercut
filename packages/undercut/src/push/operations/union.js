import { assertFunctor } from "../../utils/assert.js";
import { identity } from "../../utils/function.js";
import { closeObserver } from "../../utils/observer.js";

/**
 * Multisets are not supported.
 */
export const union = unionBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function unionBy(selector, ...sources) {
	assertFunctor(selector, `selector`);

	return function* (observer) {
		const keys = new Set();

		let success = true;

		try {
			while (true) {
				addPassItem(keys, observer, selector, yield);
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				for (const source of sources) {
					for (const item of source) {
						addPassItem(keys, observer, selector, item);
					}
				}
			}

			closeObserver(observer);
		}
	};
}

function addPassItem(keys, observer, selector, item) {
	const key = selector(item);

	if (!keys.has(key)) {
		keys.add(key);

		observer.next(item);
	}
}
