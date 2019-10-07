import { isFunction, isIterable } from "./language.js";

export function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

export function assertFunctor(functor, name) {
	assert(isFunction(functor), `"${name}" is required, must be a function.`);
}

export function assertPipeline(pipeline) {
	assert(isIterable(pipeline), `"pipeline" is required, must be an iterable of operations.`);
}

export function assertSource(source) {
	assert(isIterable(source), `"source" is required, could be any iterable.`);
}

export function assertSources(sources) {
	sources.forEach(source => assert(isIterable(source), `Every "source" in this operation must be an iterable.`));
}
