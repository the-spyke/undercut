import { assert, assertPipeline, assertSource } from "../utils/assert.js";
import { getIterator, makeReiterable } from "../utils/iterable.js";
import { isFunction, isIterable, isIterator } from "../utils/language.js";

const operationErrorMessage = `An operation must be a function taking and returning an Iterable.`;

function connectPipeline(pipeline, source) {
	assertPipeline(pipeline);
	assertSource(source);

	let iterable = source;

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

export function pullLine(pipeline, source) {
	assertPipeline(pipeline);
	assertSource(source);

	function iteratorFactory() {
		const iteratable = connectPipeline(pipeline, source);

		if (isIterator(iteratable)) {
			return iteratable;
		}

		return getIterator(source);
	}

	return makeReiterable(iteratorFactory);
}

export function pull(target, pipeline, source) {
	assert(isFunction(target), `"target" is required, must be a function accepting an iterable.`);

	return target(connectPipeline(pipeline, source));
}

export function pullItems(pipeline, source) {
	return pull(Array.from, pipeline, source);
}
