import { assert, assertFunctor } from "./assert";
import { isObjectValue } from "./language";

type Collector<C, K, V> = (collection: C, key: K, value: V, index: number) => void;
type Predicate<K, V> = (key: K, value: V, index: number) => boolean;
type Mapper<K, V, R> = (key: K, value: V, index: number) => R;
type Reducer<R, K, V> = (previous: R, key: K, value: V, index: number) => R;

/**
 * Helps to fill the `collection` with data from the provided `object`. The process is manual, and done by the `collector` function getting key and value a time.
 */
export function collectProps<T extends object, R = any>(object: T, collector: Collector<R, keyof T, T[keyof T]>, collection: R = {} as any): R {
	assert(isObjectValue(object), `"object" is required, must be a not a null.`);

	(Object.keys(object) as Array<keyof T>).forEach((key, index) => collector(collection, key, object[key], index));

	return collection;
}

/**
 * Creates a new object based on the provided `object` with properties copied over, but filtered by the `mapper` function.
 */
export function filterProps<T extends object>(object: T, predicate: Predicate<keyof T, T[keyof T]>): any {
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
export function mapKeys<T extends object, K extends PropertyKey>(object: T, mapper: Mapper<keyof T, T[keyof T], K>): { [P in K]: any } {
	assertFunctor(mapper, `mapper`);

	return collectProps(object, (c, k, v, i) => (c[mapper(k, v, i)] = v));
}

/**
 * Creates a new object based on the provided `object` with its keys copied over and values passed through the `mapper` function.
 */
export function mapValues<T extends object, R>(object: T, mapper: Mapper<keyof T, T[keyof T], R>): { [P in keyof T]: R } {
	assertFunctor(mapper, `mapper`);

	return collectProps(object, (c, k, v, i) => (c[k] = mapper(k, v, i)));
}

/**
 * Helps to reduce provided `object` into some value by passing its keys and values through the the `reducer`.
 */
export function reduceProps<T extends object, R>(object: T, reducer: Reducer<R, keyof T, T[keyof T]>, initial: R): R {
	assert(isObjectValue(object), `"object" is required, must be a not a null.`);

	return (Object.keys(object) as Array<keyof T>).reduce((acc, key, index) => reducer(acc, key, object[key], index), initial);
}
