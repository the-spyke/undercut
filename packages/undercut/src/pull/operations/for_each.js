import { assertIsRequired } from "../../utils/assertions.js";
import { isFunction } from "../../utils/lang.js";

export function forEach(action) {
	assertIsRequired(isFunction(action), "Action");

	return function* (iterable) {
		for (const item of iterable) {
			action(item);

			yield item;
		}
	};
}
