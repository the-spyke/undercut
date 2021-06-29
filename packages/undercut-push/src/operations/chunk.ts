import type { Observer, PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, asObserver, close, Cohort, isPositive } from "@undercut/utils";

export function chunk<T>(size: number): PushOperation<T, T[]> {
	assert(isPositive(size) && size >= 1, `"size" is required, must be a number >= 1.`);

	size = Math.trunc(size);

	return asObserver(function* (observer: Observer<T[]>) {
		const cohort = Cohort.of(observer);

		let chunk: T[] = [];

		try {
			while (true) {
				while (chunk.length < size) {
					chunk.push(yield);
				}

				observer.next(chunk);
				chunk = [];
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine && chunk.length) {
					observer.next(chunk);
				}
			});
		}
	});
}
