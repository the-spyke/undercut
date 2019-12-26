import { assert } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";

import { isPositive } from "@undercut/utils/src/language.js";

export function chunk(size) {
	assert(isPositive(size) && size >= 1, `"size" is required, must be a number >= 1.`);

	size = Math.trunc(size);

	return asObserver(function* (observer) {
		const cohort = Cohort.of(observer);

		let chunk = [];

		try {
			while (true) {
				while (chunk.length < size) {
					chunk.push(yield);
				}

				observer.next(chunk);
				chunk = [];
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine && chunk.length) {
					observer.next(chunk);
				}
			});
		}
	});
}
