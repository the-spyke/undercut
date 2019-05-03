import { assert, assertFunctor } from "../../utils/assertions.js";
import { identity } from "../../utils/function.js";
import { sort } from "./sort.js";

export function orderBy(...orderingSpecs) {
	assert(orderingSpecs.length > 0, `You must specify at least 1 ordering spec with "asc()" or "desc()"`);

	return sort(orderingFactory(orderingSpecs));
}

function orderingFactory(specs) {
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
