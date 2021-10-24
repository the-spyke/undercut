import type { PushOperation } from "@undercut/types";

import { abort, close, Cohort } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function average(): PushOperation<number> {
	return asPushOperation<number>(function* (observer) {
		const cohort = Cohort.of(observer);

		let sum = 0;
		let count = 0;

		try {
			while (true) {
				sum += yield;
				count++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(count && sum / count);
				}
			});
		}
	});
}
