import { closeObserver } from "../../utils/observer.js";

export function average() {
	return function* (observer) {
		let success = true;
		let sum = 0;
		let count = 0;

		try {
			while (true) {
				sum += yield;
				count++;
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				observer.next(count && sum / count);
			}

			closeObserver(observer);
		}
	};
}
