import type { AnyObject, Observer, PushOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close, Cohort } from "@undercut/utils";

export function collect<T, C>(collector: (collection: C, item: T, index: number) => void, factory: () => C): PushOperation<T, C> {
	assertFunctor(collector, `collector`);
	assertFunctor(factory, `factory`);

	return asObserver(function* (observer: Observer<C>) {
		const cohort = Cohort.of(observer);
		const collection = factory();

		try {
			let index = 0;

			while (true) {
				collector(collection, yield, index);
				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(collection);
				}
			});
		}
	});
}

export function collectArray<T>(): PushOperation<T, T[]> {
	return collect((arr, item) => arr.push(item), () => [] as T[]);
}

export function collectMap<T extends [K, V], K = unknown, V = unknown>(): PushOperation<T, Map<K, V>> {
	return collect((map, [key, value]) => map.set(key, value), () => new Map<K, V>());
}

export function collectObject<T extends [PropertyKey, V], V = unknown, O extends AnyObject<V> = AnyObject<V>>(): PushOperation<T, O> {
	return collect((obj, [key, value]) => ((obj as any)[key] = value), () => ({} as O));
}

export function collectSet<T>(): PushOperation<T, Set<T>> {
	return collect((set, key) => set.add(key), () => new Set<T>());
}
