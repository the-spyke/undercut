import { numbers, strings } from "../utils/compare.js";
import { isFunction } from "../utils/lang.js";

function reverseComparator(comparator) {
	return function (a, b) {
		return -1 * comparator(a, b);
	}
}

export function sort(comparator, isReverse = false) {
	if (!isFunction(comparator)) {
		throw new Error("comparator is required.");
	}

	const actualComparator = isReverse ? reverseComparator(comparator) : comparator;

	return function* (iterable) {
		const items = [...iterable];

		yield* items.sort(actualComparator);
	};
}

export function sortNumbers(isReverse = false) {
	return sort(numbers, isReverse);
}

export function sortStrings(isReverse = false) {
	return sort(strings, isReverse);
}
