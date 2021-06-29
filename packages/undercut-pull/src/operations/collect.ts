import type { AnyObject, PullOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";

export function collect<T, C>(collector: (collection: C, item: T, index: number) => void, factory: () => C): PullOperation<T, C> {
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

export function collectArray<T>(): PullOperation<T, Array<T>> {
	return collect((arr, item: T) => arr.push(item), () => [] as Array<T>);
}

export function collectMap<T extends [K, V], K = any, V = any>(): PullOperation<T, Map<K, V>> {
	return collect((map, [key, value]) => map.set(key, value), () => new Map<K, V>());
}

export function collectObject<T extends [PropertyKey, V], V = unknown, O extends AnyObject<V> = AnyObject<V>>(): PullOperation<T, O> {
	return collect((obj, [key, value]) => ((obj as any)[key] = value), () => ({} as O));
}

export function collectSet<T>(): PullOperation<T, Set<T>> {
	return collect((set, key) => set.add(key), () => new Set<T>());
}
