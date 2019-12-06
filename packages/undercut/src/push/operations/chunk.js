import { assert } from "../../utils/assert.js";
import { abort, asObserver, close, Cohort } from "../../utils/coroutine.js";

import { isPositive } from "../../utils/language.js";

export function chunk(size) {
	assert(isPositive(size) && size >= 1, `"size" is required, must be a number >= 1.`);

	size = Math.trunc(size);

	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);

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
