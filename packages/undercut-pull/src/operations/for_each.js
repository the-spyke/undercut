import { assert } from "@undercut/utils/src/assert.js";
import { isFunction } from "@undercut/utils/src/language.js";

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
