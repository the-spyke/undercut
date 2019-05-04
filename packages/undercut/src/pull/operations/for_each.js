import { assert } from "../../utils/assert.js";
import { isFunction } from "../../utils/language.js";

export function forEach(action) {
	assert(isFunction(action), `"action" is required, must be a function.`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			action(item, index);

			yield item;

			index++;
		}
	};
}
