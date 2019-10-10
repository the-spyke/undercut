import { assert, assertPipeline, assertSource } from "../utils/assert.js";
import { isObserver, isFunction } from "../utils/language.js";
import { closeObserver, initializeObserver } from "../utils/observer.js";

import { createPushTarget } from "./push_targets.js";

const operationErrorMessage = `An operation must be a function taking and returning an Observer.`;

function connectPipeline(pipeline, target, initialize = true) {
	assertPipeline(pipeline);
	assert(isObserver(target), `"target" is required and must be an Observer.`);

	const operations = Array.isArray(pipeline) ? pipeline : [...pipeline];

	let observer = target;

	for (let index = operations.length - 1; index >= 0; index--) {
		const operation = operations[index];

		assert(isFunction(operation), operationErrorMessage);

		observer = operation(observer);

		assert(isObserver(observer), operationErrorMessage);

		if (index > 0 || initialize) {
			initializeObserver(observer);
		}
	}

	return observer;
}

export function composeOperations(pipeline) {
	return function (observer) {
		return connectPipeline(pipeline, observer, false);
	};
}

export function pushLine(pipeline, target) {
	return connectPipeline(pipeline, target, true);
}

export function push(target, pipeline, source) {
	assertSource(source);

	const observer = pushLine(pipeline, target);

	try {
		for (const item of source) {
			observer.next(item);
		}
	} finally {
		closeObserver(observer);
	}

	return target;
}

export function pushItems(pipeline, source) {
	const target = createPushTarget();

	push(target, pipeline, source);

	return target.items;
}
