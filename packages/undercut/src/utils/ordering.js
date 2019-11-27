import { assert, assertFunctor } from "./assert.js";
import { identity } from "./function.js";
import { isFunction } from "./language.js";

export function orderingFactory(specs) {
	assert(Array.isArray(specs), `"specs" must be an array of ordering specs produced by asc/desc functions.`);
	specs.forEach((spec, index) => {
		assert(
			Array.isArray(spec) && spec.length === 3 && (spec[0] === asc || spec[0] === desc) && isFunction(spec[1]) && isFunction(spec[2]),
			`#${index} ordering spec is invalid.`
		);
	});

	return function (a, b) {
		for (const [order, comparator, selector] of specs) {
			const x = selector(a);
			const y = selector(b);

			const result = comparator(x, y);

			if (result !== 0) {
				return order === asc ? result : -result;
			}
		}

		return 0;
	};
}

export function asc(comparator, selector = identity) {
	assertFunctor(comparator, `comparator`);
	assertFunctor(selector, `selector`);

	return [asc, comparator, selector];
}

export function desc(comparator, selector = identity) {
	assertFunctor(comparator, `comparator`);
	assertFunctor(selector, `selector`);

	return [desc, comparator, selector];
}
