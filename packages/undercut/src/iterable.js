import { assert } from "./utils/assert.js";
import { isFunction } from "./utils/language.js";

/**
 * A wrapper for generators to make them re-iterable.
 */
export default class Iterable {
	constructor(iteratorFactory) {
		assert(isFunction(iteratorFactory), `"iteratorFactory" is required, must be a function.`);

		this[Symbol.iterator] = iteratorFactory;
	}
}
