import { assertIsRequired } from "../../utils/assertions.js";
import { isFunction } from "../../utils/lang.js";

export function map(mapper) {
	assertIsRequired(isFunction(mapper), "Mapper");

	return function* (iterable) {
		for (const item of iterable) {
			yield mapper(item);
		}
	};
}
