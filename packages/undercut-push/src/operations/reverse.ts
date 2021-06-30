import type { PushOperation } from "@undercut/types";

import { abort, close, Cohort } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function reverse<T>(): PushOperation<T> {
	return asPushOperation<T>(function* (observer) {
		const cohort = Cohort.of(observer);
		const items: T[] = [];

		try {
			while (true) {
				items.push(yield);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (let i = items.length - 1; i >= 0; i--) {
						observer.next(items[i]);
					}
				}
			});
		}
	});
}
