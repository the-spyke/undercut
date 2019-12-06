import { assertSource } from "../../utils/assert.js";
import { abort, asObserver, close, Cohort } from "../../utils/coroutine.js";

export function concatStart(source) {
	assertSource(source);

	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);

		let hasItems = false;

		try {
			const firstItem = yield;

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

export function concatEnd(source) {
	assertSource(source);

	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);

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
