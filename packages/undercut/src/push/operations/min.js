import { tryCloseObserver } from "../../utils/observer.js";

export function min() {
	return function* (observer) {
		let success = true;
		let min = null;

		try {
			while (true) {
				const item = yield;

				if (min === null || item < min) {
					min = item;
				}
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success && min !== null) {
				observer.next(min);
			}

			tryCloseObserver(observer);
		}
	};
}
