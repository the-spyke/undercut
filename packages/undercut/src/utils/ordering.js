import { assert, assertFunctor } from "./assert.js";
import { identity } from "./function.js";
import { isFunction, isNumberValue } from "./language.js";

export function orderingFactory(specs) {
	assert(Array.isArray(specs), `"specs" must be an array of ordering specs produced by asc/desc functions.`);
	specs.forEach((spec, index) => {
		assert(
			Array.isArray(spec) && spec.length === 3 && isFunction(spec[0]) && isFunction(spec[1]) && isNumberValue(spec[2]),
			`#${index} ordering spec is invalid.`
		);
	});

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
