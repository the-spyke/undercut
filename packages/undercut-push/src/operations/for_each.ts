import type { Action, Observer, PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, asObserver, close, isFunction } from "@undercut/utils";

export function forEach<T>(action: Action<T>): PushOperation<T> {
	assert(isFunction(action), `"action" is required, must be a function.`);

	return asObserver(function* (observer: Observer<T>) {
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
