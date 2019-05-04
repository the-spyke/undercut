import { assert } from "./utils/assert.js";
import { isFunction } from "./utils/language.js";

/**
 * A wrapper for generators to make them re-iterable.
 */
export default class Iterable {
	constructor(createIterator) {
		assert(isFunction(createIterator), "createIterator is required.");

		this[Symbol.iterator] = createIterator;
	}
}
