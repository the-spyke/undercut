import { assert } from "@undercut/utils/src/assert.js";
import { isFunction } from "@undercut/utils/src/language.js";

export function map(mapper) {
	assert(isFunction(mapper), `"mapper" is required, must be a function.`);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			yield mapper(item, index);

			index++;
		}
	};
}
