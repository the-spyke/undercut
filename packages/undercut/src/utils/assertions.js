import { isFunction } from "./lang.js";

export function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

export function assertComparator(comparator) {
	assert(isFunction(comparator), "Comparator is required.");
}

export function assertPredicate(predicate) {
	assert(isFunction(predicate), "Predicate is required.");
}
