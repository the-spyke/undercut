import type { Mapper, PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, close, isFunction } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function map<T, R = T>(mapper: Mapper<T, R>): PushOperation<T, R> {
	assert(isFunction(mapper), `"mapper" is required, must be a function.`);

	return asPushOperation<T, R>(function* (observer) {
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
