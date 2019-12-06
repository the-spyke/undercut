import { assert, assertPipeline, assertSource } from "../utils/assert.js";
import { abort, close } from "../utils/coroutine.js";
import { isObserver, isFunction } from "../utils/language.js";

import { toArray } from "./push_targets.js";

const operationErrorMessage = `An operation must be a function taking and returning an Observer.`;

function connectPipeline(pipeline, target) {
	assertPipeline(pipeline);
	assert(isObserver(target), `"target" is required and must be an Observer.`);

	const operations = Array.isArray(pipeline) ? pipeline : [...pipeline];

	let observer = target;

	for (let index = operations.length - 1; index >= 0; index--) {
		const operation = operations[index];

		assert(isFunction(operation), operationErrorMessage);

		observer = operation(observer);

		assert(isObserver(observer), operationErrorMessage);
	}

	return observer;
}

export function composeOperations(operations) {
	return function (observer) {
		return connectPipeline(operations, observer);
	};
}

export function pushLine(pipeline, target) {
	return connectPipeline(pipeline, target);
}

export function push(target, pipeline, source) {
	assertSource(source);

	const observer = pushLine(pipeline, target);

	try {
		for (const item of source) {
			observer.next(item);
		}
	} catch (error) {
		abort(observer, error);
	} finally {
		close(observer);
	}

	return target;
}

export function pushItems(pipeline, source) {
	const target = toArray();

	push(target, pipeline, source);

	return target.values;
}
