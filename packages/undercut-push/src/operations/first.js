import { abort, asObserver, close } from "@undercut/utils/src/coroutine.js";

export function first() {
	return asObserver(function* (observer) {
		try {
			observer.next(yield);
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
