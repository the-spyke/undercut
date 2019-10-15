import { closeObserver } from "../../utils/observer.js";

export function max() {
	return function* (observer) {
		let success = true;
		let max = null;

		try {
			while (true) {
				const item = yield;

				if (max === null || item > max) {
					max = item;
				}
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success && max !== null) {
				observer.next(max);
			}

			closeObserver(observer);
		}
	};
}
