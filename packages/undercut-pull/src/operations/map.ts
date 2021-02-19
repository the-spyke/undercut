import type { Mapper, PullOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { isFunction } from "@undercut/utils";

export function map<T, R>(mapper: Mapper<T, R>): PullOperation<T, R> {
	assert(isFunction(mapper), `"mapper" is required, must be a function.`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			yield mapper(item, index);

			index++;
		}
	};
}
