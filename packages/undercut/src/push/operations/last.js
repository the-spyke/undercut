import { tryCloseObserver } from "../../utils/observer.js";

export function last() {
	return function* (observer) {
		let success = true;
		let hasItems = false;
		let item = undefined;

		try {
			while (true) {
				item = yield;
				hasItems = true;
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success && hasItems) {
				observer.next(item);
			}

			tryCloseObserver(observer);
		}
	};
}
