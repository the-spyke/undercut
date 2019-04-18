import { isFunction, isIterable, isNumber } from "./lang.js";

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
	assert(isNumber(count) && count >= 0, "Count is required and must be >= 0");
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
	assert(isIterable(source), "Source is required and must be iterable.");
}
