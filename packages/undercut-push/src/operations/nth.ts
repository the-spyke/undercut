import type { Observer, PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, asObserver, close, isPositiveOrZero } from "@undercut/utils";

export function nth<T>(n: number): PushOperation<T> {
	assert(isPositiveOrZero(n), `"n" is required, must be a number >= 0.`);

	n = Math.trunc(n);

	return asObserver(function* (observer: Observer<T>) {
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
