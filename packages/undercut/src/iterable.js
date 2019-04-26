import { assert } from "./utils/assertions.js";
import { isFunction } from "./utils/lang.js";

export default class Iterable {
	constructor(createIterator) {
		assert(isFunction(createIterator), "createIterator is required.");

		this[Symbol.iterator] = createIterator;
	}
}
