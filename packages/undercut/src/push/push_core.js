import { assert, assertPipeline, assertSource } from "../utils/assert.js";
import { getIterator } from "../utils/iterable.js";
import { isFunction, isIterable } from "../utils/language.js";

import Iterable from "../iterable.js";

const operationErrorMessage = "An operation must be a function taking an iterable as an argument and returning another iterable.";

function connectPipeline(pipeline, target) {
	assertPipeline(pipeline);
	assertSource(target);

	let iterable = target;

	for (const operation of pipeline) {
		assert(isFunction(operation), operationErrorMessage);

		iterable = operation(iterable);

		assert(isIterable(iterable), operationErrorMessage);
	}

	return iterable;
}

export function composeOperations(pipeline) {
	return function (iterable) {
		return connectPipeline(pipeline, iterable);
	};
}

export function createPullLine(pipeline, source) {
	assertPipeline(pipeline);
	assertSource(source);

	function iteratorFactory() {
		const iterator = connectPipeline(pipeline, source);

		if (!isFunction(iterator.next)) {
			return getIterator(source);
		}

		return iterator;
	}

	return new Iterable(iteratorFactory);
}

export function push(target, pipeline, source) {
	assert(isFunction(target), `"target" is required, must be a function accepting an iterable.`);

	return target(connectPipeline(pipeline, source));
}
