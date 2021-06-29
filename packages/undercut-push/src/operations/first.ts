import type { Observer, PushOperation } from "@undercut/types";

import { abort, asObserver, close } from "@undercut/utils";

export function first<T>(): PushOperation<T> {
	return asObserver(function* (observer: Observer<T>) {
		try {
			observer.next(yield);
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
