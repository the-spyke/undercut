import { assertFunctor } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";

export function groupBy(keySelector) {
	assertFunctor(keySelector, `keySelector`);

	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);
		const groups = new Map();

		try {
			let index = 0;

			while (true) {
				const item = yield;
				const key = keySelector(item, index);

				let groupItems = groups.get(key);

				if (!groupItems) {
					groupItems = [];
					groups.set(key, groupItems);
				}

				groupItems.push(item);

				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (const group of groups) {
						observer.next(group);
					}
				}
			});
		}
	});
}
