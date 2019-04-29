import { isFunction, isIterable } from "./lang.js";

export function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

export function assertIsRequired(condition, name) {
	assert(condition, `${name} is required.`);
}

export function assertComparator(comparator) {
	assertIsRequired(isFunction(comparator), "Comparator");
}

export function assertCount(count) {
	assert(Number.isFinite(count) && count >= 0, "Count is required and must be >= 0");
}

export function assertPipeline(pipeline) {
	assert(isIterable(pipeline), "Pipeline is required, could be an array or another iterable of operations.");
}

export function assertPredicate(predicate) {
	assertIsRequired(isFunction(predicate), "Predicate");
}

export function assertReducer(reducer) {
	assertIsRequired(isFunction(reducer), "Reducer");
}

export function assertSelector(selector) {
	assertIsRequired(isFunction(selector), "Selector");
}

export function assertSource(source) {
	assert(isIterable(source), "Source is required, could be any iterable.");
}

export function assertSources(sources) {
	sources.forEach(source => assert(isIterable(source), "Every source in this operation must be an iterable."));
}
