import { assertFunctor } from "../../utils/assert.js";

export function collect(collector, factory) {
	assertFunctor(collector, `collector`);
	assertFunctor(factory, `factory`);

	return function* (iterable) {
		const collection = factory();

		let index = 0;

		for (const item of iterable) {
			collector(collection, item, index);
			index++;
		}

		yield collection;
	};
}
