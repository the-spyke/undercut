import { assert } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";
import { identity } from "@undercut/utils/src/function.js";
import { isFunction } from "@undercut/utils/src/language.js";

export function unzip() {
	return unzipWith(identity);
}

export function unzipWith(itemsExtractor) {
	assert(isFunction(itemsExtractor), `"itemsExtractor" is required, must be a function.`);

	return asObserver(function* (observer) {
		const cohort = Cohort.of(observer);
		const results = [];

		try {
			let index = 0;

			while (true) {
				const item = yield;
				const values = itemsExtractor(item, index);

				if (results.length === 0) {
					values.forEach(() => results.push([]));
				} else if (results.length !== values.length) {
					throw new Error(`"itemsExtractor" returns variable length arrays: was ${results.length}, now ${values.length}`);
				}

				values.forEach((v, i) => results[i].push(v));

				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (const result of results) {
						observer.next(result);
					}
				}
			});
		}
	});
}
