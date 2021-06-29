import type { Observer, PushOperation } from "@undercut/types";

import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function join<T>(separator = `,`): PushOperation<T, string> {
	separator = String(separator);

	return asObserver(function* (observer: Observer<string>) {
		const cohort = Cohort.of(observer);

		let result: string | null = null;

		try {
			while (true) {
				const item: T = yield;
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
