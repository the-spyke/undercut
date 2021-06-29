import type { Mapper, Observer, PushOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function groupBy<T, K>(keySelector: Mapper<T, K>): PushOperation<T, [K, T[]]> {
	assertFunctor(keySelector, `keySelector`);

	return asObserver(function* (observer: Observer<[K, T[]]>) {
		const cohort = Cohort.of(observer);
		const groups = new Map<K, T[]>();

		try {
			let index = 0;

			while (true) {
				const item: T = yield;
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
