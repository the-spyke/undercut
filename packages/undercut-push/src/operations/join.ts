import type { PushOperation } from "@undercut/types";

import { abort, close, Cohort } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function join<T>(separator = `,`): PushOperation<T, string> {
	separator = String(separator);

	return asPushOperation<T, string>(function* (observer) {
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
