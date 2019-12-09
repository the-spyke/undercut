import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";

export function join(separator = `,`) {
	separator = String(separator);

	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);

		let result = null;

		try {
			while (true) {
				const item = yield;
				const value = item != null ? String(item) : ``;

				if (result !== null) {
					result += `${separator}${value}`;
				} else {
					result = value;
				}
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(result || ``);
				}
			});
		}
	});
}
