import { assertSource } from "../../utils/assert.js";
import { closeObserver } from "../../utils/observer.js";

export function concatStart(source) {
	assertSource(source);

	return function* (observer) {
		let success = true;
		let hasItems = false;

		try {
			const firstItem = yield;

			hasItems = true;
			
			for (const item of source) {
				observer.next(item);
			}
			
			observer.next(firstItem);

			while (true) {
				observer.next(yield);
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success && !hasItems) {
				for (const item of source) {
					observer.next(item);
				}
			}

			closeObserver(observer);
		}
	};
}

export function concatEnd(source) {
	assertSource(source);

	return function* (observer) {
		let success = true;

		try {
			while (true) {
				observer.next(yield);
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				for (const item of source) {
					observer.next(item);
				}
			}

			closeObserver(observer);
		}
	};
}
