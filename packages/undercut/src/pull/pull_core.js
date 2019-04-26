import { assert, assertSource } from "../utils/assertions.js";
import { isFunction, isIterable } from "../utils/lang.js";

import Iterable from "../iterable.js";

const operationErrorMessage = "An operation must be a function taking an iterable as an argument and returning another iterable.";

function operationsToIterator(operations, source) {
	let result = source;

	for (const operation of operations) {
		assert(isFunction(operation), operationErrorMessage);

		result = operation(result);

		assert(isIterable(result), operationErrorMessage);
	}

	if (result === source) {
		return source[Symbol.iterator]();
	}

	return result;
}

export function pullLine(operations, source) {
	assert(isIterable(operations), "Operations are required, could be an array or another iterable.");
	assertSource(source);

	return new Iterable(() => operationsToIterator(operations, source));
}

export function pull(target, operations, source) {
	assert(isFunction(target), "Target is required, must be a function accepting an iterable.");
	assert(isIterable(operations), "Operations are required, could be an array or another iterable.");
	assertSource(source);

	return target(operationsToIterator(operations, source));
}
