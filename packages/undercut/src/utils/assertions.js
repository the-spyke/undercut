import { isFunction, isIterable, isNumber } from "./lang.js";

export function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

export function assertComparator(comparator) {
	assert(isFunction(comparator), "Comparator is required.");
}

export function assertCount(count) {
	assert(isNumber(count) && count >= 0, "Count is required and must be >= 0");
}

export function assertPredicate(predicate) {
	assert(isFunction(predicate), "Predicate is required.");
}

export function assertSelector(selector) {
	assert(isFunction(selector), "Selector is required.");
}

export function assertSource(source) {
	assert(isIterable(source), "Source is required and must be iterable.");
}
