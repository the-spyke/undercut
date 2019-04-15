import { assertComparator } from "../../utils/assertions.js";
import { identity } from "../../utils/function.js";
import { sort } from "./sort.js";

export function orderBy(...orderingSpecs) {
	return sort(orderingFactory(orderingSpecs));
}

function orderingFactory(specs) {
	return function (a, b) {
		for (const [selector, order, comparator] of specs) {
			const x = selector(a);
			const y = selector(b);

			const result = order * comparator(x, y);

			if (result !== 0) {
				return result;
			}
		}

		return 0;
	};
}

export function asc(comparator, selector = identity) {
	assertComparator(comparator);

	return [selector, 1, comparator];
}

export function desc(comparator, selector = identity) {
	assertComparator(comparator);

	return [selector, -1, comparator];
}
