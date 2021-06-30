import type { PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, close, isPositiveOrZero } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function nth<T>(n: number): PushOperation<T> {
	assert(isPositiveOrZero(n), `"n" is required, must be a number >= 0.`);

	n = Math.trunc(n);

	return asPushOperation<T>(function* (observer) {
		try {
			let index = -1;
			let item: T;

			do {
				item = yield;
				index++;
			} while (index !== n);

			observer.next(item);
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
