import { closeObserver } from "../../utils/observer.js";

export function first() {
	return function* (observer) {
		try {
			observer.next(yield);
		} catch (e) {
			observer.throw(e);
		} finally {
			closeObserver(observer);
		}
	};
}
