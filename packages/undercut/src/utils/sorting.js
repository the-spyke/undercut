import { assertFunctor } from "./assert.js";
import { identity } from "./function.js";

export function reverseComparator(comparator) {
	return function (a, b) {
		return -1 * comparator(a, b);
	}
}

export function orderingFactory(specs) {
	return function (a, b) {
		for (const [comparator, selector, order] of specs) {
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
	assertFunctor(comparator, "comparator");
	assertFunctor(selector, "selector");

	return [comparator, selector, 1];
}

export function desc(comparator, selector = identity) {
	assertFunctor(comparator, "comparator");
	assertFunctor(selector, "selector");

	return [comparator, selector, -1];
}
