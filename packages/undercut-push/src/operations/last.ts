import type { PushOperation } from "@undercut/types";

import { abort, close, Cohort } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function last<T>(): PushOperation<T> {
	return asPushOperation<T>(function* (observer) {
		const cohort = Cohort.of(observer);

		let hasItems = false;
		let item: T | undefined = undefined;

		try {
			while (true) {
				item = yield;
				hasItems = true;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine && hasItems) {
					observer.next(item as T);
				}
			});
		}
	});
}
