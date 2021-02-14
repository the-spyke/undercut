import { assert, assertFunctor } from "./assert";
import { isObjectValue } from "./language";

type SomeObject = { [key: string]: any; };
type Collector<C, K, V> = (collection: C, key: K, value: V, index: number) => void;
type Predicate<K, V> = (key: K, value: V, index: number) => boolean;
type Mapper<K, V, R> = (key: K, value: V, index: number) => R;
type Reducer<K, V, R> = (previous: R, key: K, value: V, index: number) => R;

/**
 * Helps to fill the `collection` with data from the provided `object`. The process is manual, and done by the `collector` function getting key and value a time.
 */
function collectProps<T extends SomeObject, K extends keyof T, R>(object: T, collector: Collector<R, K, T[K]>, collection: R = {}): R {
	assert(isObjectValue(object), `"object" is required, must be a not a null.`);

	Object.keys(object).forEach((key, index) => collector(collection, key, object[key], index));

	return collection;
}

export { collectProps };

/**
 * Creates a new object based on the provided `object` with properties copied over, but filtered by the `mapper` function.
 */
export function filterProps<T extends SomeObject, K extends keyof T>(object: T, predicate: Predicate<K, T[K]>): { [P in K]: T[P]; } {
	assertFunctor(predicate, `predicate`);

	return collectProps(object, (c, k, v, i) => {
		if (predicate(k, v, i)) {
			c[k] = v;
		}
	});
}

/**
 * Creates a new object based on the provided `object` with its keys passed through the `mapper` function and values copied over.
 */
export function mapKeys<T extends SomeObject, K extends keyof T, R>(object: T, mapper: Mapper<K, T[K], string>): R {
	assertFunctor(mapper, `mapper`);

	return collectProps(object, (c, k, v, i) => (c[mapper(k, v, i)] = v));
}

/**
 * Creates a new object based on the provided `object` with its keys copied over and values passed through the `mapper` function.
 */
export function mapValues<T extends SomeObject, K extends keyof T, R>(object: T, mapper: Mapper<K, T[K], R>): T {
	assertFunctor(mapper, `mapper`);

	return collectProps(object, (c, k, v, i) => (c[k] = mapper(k, v, i)));
}

/**
 * Helps to reduce provided `object` into some value by passing its keys and values through the the `reducer`.
 */
export function reduceProps<T extends SomeObject, K extends keyof T, R>(object: T, reducer: Reducer<K, T[K], R>, initial: R): R {
	assert(isObjectValue(object), `"object" is required, must be a not a null.`);

	Object.keys(object).forEach((key, index) => (initial = reducer(initial, key, object[key], index)));

	return initial;
}
