import { assertFunctor } from "../../utils/assert.js";
import { closeObserver } from "../../utils/observer.js";

export function groupBy(keySelector) {
	assertFunctor(keySelector, "keySelector");

	return function* (observer) {
		const groups = new Map();

		let success = true;

		try {
			let index = 0;

			while (true) {
				const item = yield;
				const key = keySelector(item, index);

				let groupItems = groups.get(key);

				if (!groupItems) {
					groupItems = [];
					groups.set(key, groupItems);
				}

				groupItems.push(item);

				index++;
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				for (const group of groups) {
					observer.next(group)
				}
			}

			closeObserver(observer);
		}
	};
}
