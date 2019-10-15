import { assertFunctor } from "./assert.js";
import { identity } from "./function.js";

export function orderingFactory(specs) {
	return function (a, b) {
		for (const [comparator, selector, direction] of specs) {
			const x = selector(a);
			const y = selector(b);

			const result = direction * comparator(x, y);

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
