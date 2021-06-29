import type { Observer, PushOperation } from "@undercut/types";

import { assertSource } from "@undercut/utils/assert";
import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function concatStart<T, S = T>(source: Iterable<S>): PushOperation<T, T | S> {
	assertSource(source);

	return asObserver(function* (observer: Observer<T | S>) {
		const cohort = Cohort.of(observer);

		let hasItems = false;

		try {
			const firstItem: T = yield;

			hasItems = true;

			for (const item of source) {
				observer.next(item);
			}

			observer.next(firstItem);

			while (true) {
				observer.next(yield);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine && !hasItems) {
					for (const item of source) {
						observer.next(item);
					}
				}
			});
		}
	});
}

export function concatEnd<T, S = T>(source: Iterable<S>): PushOperation<T, T | S> {
	assertSource(source);

	return asObserver(function* (observer: Observer<T | S>) {
		const cohort = Cohort.of(observer);

		try {
			while (true) {
				observer.next(yield);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (const item of source) {
						observer.next(item);
					}
				}
			});
		}
	});
}
