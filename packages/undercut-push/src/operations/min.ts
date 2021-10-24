import type { PushOperation } from "@undercut/types";

import { abort, close, Cohort } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function min(): PushOperation<number> {
	return asPushOperation<number>(function* (observer) {
		const cohort = Cohort.of(observer);

		let min: number | null = null;

		try {
			while (true) {
				const item: number = yield;

				if (min === null || item < min) {
					min = item;
				}
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine && min !== null) {
					observer.next(min);
				}
			});
		}
	});
}
