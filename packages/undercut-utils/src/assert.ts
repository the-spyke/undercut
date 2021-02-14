import { isFunction, isIterable, isIterator } from "./language.js";

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
	assert(isIterable(source) && !isIterator(source), `"source" is required and must be an Iterable, but not an Iterator. It is assumed that a source is re-iterable.`);
}

export function assertSources(sources) {
	sources.forEach(source => assert(isIterable(source), `Every "source" in this operation must be an iterable.`));
}
