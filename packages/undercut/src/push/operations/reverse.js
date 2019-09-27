import { tryCloseObserver } from "../../utils/observer.js";

export function reverse() {
	return function* (observer) {
		let success = true;
		let items = [];

		try {
			while (true) {
				items.push(yield);
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				for (let i = items.length - 1; i >= 0; i--) {
					observer.next(items[i]);
				}
			}

			tryCloseObserver(observer);
		}
	};
}
