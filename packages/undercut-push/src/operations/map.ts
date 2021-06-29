import type { Mapper, Observer, PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, asObserver, close, isFunction } from "@undercut/utils";

export function map<T, R = T>(mapper: Mapper<T, R>): PushOperation<T, R> {
	assert(isFunction(mapper), `"mapper" is required, must be a function.`);

	return asObserver(function* (observer: Observer<R>) {
		try {
			let index = 0;

			while (true) {
				observer.next(mapper(yield, index));
				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
