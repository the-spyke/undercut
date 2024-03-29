import type { PushOperation } from "@undercut/types";

import { abort, close, Cohort } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function max(): PushOperation<number> {
	return asPushOperation<number>(function* (observer) {
		const cohort = Cohort.of(observer);

		let max: number | null = null;

		try {
			while (true) {
				const item: number = yield;

				if (max === null || item > max) {
					max = item;
				}
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine && max !== null) {
					observer.next(max);
				}
			});
		}
	});
}
