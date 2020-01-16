import { assertFunctor } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";
import { identity } from "@undercut/utils/src/function.js";

/**
 * Multisets are not supported.
 */
export const union = unionBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function unionBy(selector, ...sources) {
	assertFunctor(selector, `selector`);

	return asObserver(function* (observer) {
		const cohort = Cohort.of(observer);
		const keys = new Set();

		try {
			while (true) {
				addPassItem(keys, observer, selector, yield);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (const source of sources) {
						for (const item of source) {
							addPassItem(keys, observer, selector, item);
						}
					}
				}
			});
		}
	});
}

function addPassItem(keys, observer, selector, item) {
	const key = selector(item);

	if (!keys.has(key)) {
		keys.add(key);

		observer.next(item);
	}
}
