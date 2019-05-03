import { assert } from "../../utils/assertions.js";
import { isFunction } from "../../utils/lang.js";

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
