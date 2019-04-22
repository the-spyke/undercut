import { assertIsRequired } from "../../utils/assertions.js";
import { isFunction } from "../../utils/lang.js";

export function forEach(action) {
	assertIsRequired(isFunction(action), "Action");

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			action(item, index);

			yield item;

			index++;
		}
	};
}
