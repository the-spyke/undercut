import type { Predicate, PushOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, close, Cohort } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function some<T>(predicate: Predicate<T>): PushOperation<T, boolean> {
	assertFunctor(predicate, `predicate`);

	return asPushOperation<T, boolean>(function* (observer) {
		const cohort = Cohort.of(observer);

		let result = false;

		try {
			let index = 0;

			while (!result) {
				result = predicate(yield, index);
				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(result);
				}
			});
		}
	});
}
