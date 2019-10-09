import { assert } from "../../utils/assert.js";
import { isFunction } from "../../utils/language.js";
import { closeObserver } from "../../utils/observer.js";

export function map(mapper) {
	assert(isFunction(mapper), `"mapper" is required, must be a function.`);

	return function* (observer) {
		try {
			let index = 0;

			while (true) {
				observer.next(mapper(yield, index));
				index++;
			}
		} catch (e) {
			observer.throw(e);
		} finally {
			closeObserver(observer);
		}
	};
}
