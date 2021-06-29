import { Observer, PushOperation, Reducer } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function reduce<T, R>(reducer: Reducer<T, R>, initial: R): PushOperation<T, R> {
	assertFunctor(reducer, `predicate`);

	return asObserver(function* (observer: Observer<R>) {
		const cohort = Cohort.of(observer);

		let acc: R = initial;

		try {
			let index = 0;

			while (true) {
				acc = reducer(acc, yield, index);
				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(acc);
				}
			});
		}
	});
}
