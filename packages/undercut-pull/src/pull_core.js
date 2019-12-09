import { assert, assertPipeline, assertSource } from "@undercut/utils/src/assert.js";
import { createIterable, getIterator } from "@undercut/utils/src/iterable.js";
import { isFunction, isIterable, isIterator } from "@undercut/utils/src/language.js";

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

export function composeOperations(operations) {
	return function (iterable) {
		return connectPipeline(isFunction(operations) ? operations() : operations, iterable);
	};
}

export function pullLine(pipeline, source) {
	assertPipeline(pipeline);
	assertSource(source);

	return createIterable(() => {
		const iteratable = connectPipeline(pipeline, source);

		if (isIterator(iteratable)) {
			return iteratable;
		}

		return getIterator(source);
	});
}

export function pull(target, pipeline, source) {
	assert(isFunction(target), `"target" is required, must be a function accepting an iterable.`);

	return target(connectPipeline(pipeline, source));
}

export function pullItems(pipeline, source) {
	return pull(Array.from, pipeline, source);
}
