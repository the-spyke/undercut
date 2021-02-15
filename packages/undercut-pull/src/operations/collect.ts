import { assertFunctor } from "@undercut/utils/assert";

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

export function collectArray() {
	return collect((arr, item) => arr.push(item), () => []);
}

export function collectMap() {
	return collect((map, [key, value]) => map.set(key, value), () => new Map());
}

export function collectObject() {
	return collect((obj, [key, value]) => (obj[key] = value), () => ({}));
}

export function collectSet() {
	return collect((set, key) => set.add(key), () => new Set());
}
