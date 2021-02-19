import type { Action, PullOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { isFunction } from "@undercut/utils";

export function forEach<T>(action: Action<T>): PullOperation<T> {
	assert(isFunction(action), `"action" is required, must be a function.`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			action(item, index);

			yield item;

			index++;
		}
	};
}
