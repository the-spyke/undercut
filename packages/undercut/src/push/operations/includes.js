import { tryCloseObserver } from "../../utils/observer.js";

export function includes(value) {
	return function* (observer) {
		let success = true;
		let hasValue = false;

		try {
			while (!hasValue) {
				hasValue = (yield) === value;
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				observer.next(hasValue);
			}

			tryCloseObserver(observer);
		}
	};
}
