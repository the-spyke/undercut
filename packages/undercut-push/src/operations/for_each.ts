import type { Action, PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, close, isFunction } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function forEach<T>(action: Action<T>): PushOperation<T> {
	assert(isFunction(action), `"action" is required, must be a function.`);

	return asPushOperation<T>(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item: T = yield;

				action(item, index);
				observer.next(item);

				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
