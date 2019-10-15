import { assert } from "../../utils/assert.js";
import { identity } from "../../utils/function.js";
import { isFunction } from "../../utils/language.js";
import { closeObserver } from "../../utils/observer.js";

export function unzip() {
	return unzipWith(identity);
}

export function unzipWith(itemsExtractor) {
	assert(isFunction(itemsExtractor), `"itemsExtractor" is required, must be a function.`);

	return function* (observer) {
		const results = [];

		let success = true;

		try {
			let index = 0;

			while (true) {
				const item = yield;
				const values = itemsExtractor(item, index);

				if (results.length === 0) {
					values.forEach(() => results.push([]));
				} else if (results.length !== values.length) {
					throw new Error(`"itemsExtractor" returns variable length arrays: was ${results.length}, now ${values.length}`);
				}

				values.forEach((v, i) => results[i].push(v));

				index++;
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				for (const result of results) {
					observer.next(result);
				}
			}

			closeObserver(observer);
		}
	};
}
