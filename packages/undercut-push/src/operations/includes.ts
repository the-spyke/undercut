import type { PushOperation } from "@undercut/types";

import { abort, close, Cohort } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function includes<T>(value: T): PushOperation<T, boolean> {
	return asPushOperation<T, boolean>(function* (observer) {
		const cohort = Cohort.of(observer);

		let hasValue = false;

		try {
			while (!hasValue) {
				hasValue = (yield) === value;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(hasValue);
				}
			});
		}
	});
}
