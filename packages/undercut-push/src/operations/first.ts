import type { PushOperation } from "@undercut/types";

import { abort, close } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function first<T>(): PushOperation<T> {
	return asPushOperation<T>(function* (observer) {
		try {
			observer.next(yield);
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
