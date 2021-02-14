import { isFunction, isIterable, isIterator } from "./language";

export function assert(condition: boolean, message: string): void {
	if (!condition) {
		throw new Error(message);
	}
}

export function assertFunctor(functor: unknown, name: string): void {
	assert(isFunction(functor), `"${name}" is required, must be a function.`);
}

export function assertPipeline(pipeline: unknown): void {
	assert(isIterable(pipeline), `"pipeline" is required, must be an iterable of operations.`);
}

export function assertSource(source: unknown): void {
	assert(isIterable(source) && !isIterator(source), `"source" is required and must be an Iterable, but not an Iterator. It is assumed that a source is re-iterable.`);
}

export function assertSources(sources: Array<unknown>): void {
	sources.forEach(source => assert(isIterable(source), `Every "source" in this operation must be an iterable.`));
}
