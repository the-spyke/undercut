import { abort, asObserver, close } from "../../utils/coroutine.js";

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
