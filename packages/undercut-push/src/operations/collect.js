import { assertFunctor } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";

export function collect(collector, factory) {
	assertFunctor(collector, `collector`);
	assertFunctor(factory, `factory`);

	return asObserver(function* (observer) {
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
