import { assert, assertFunctor } from "./assert.js";
import { isObjectValue } from "./language.js";

/**
 * Helps to fill the `collection` with data from the provided `object`. The process is manual, and done by the `collector` function getting key and value a time.
 * @type {<T extends { [key: string]: any }, K extends keyof T, R>(object: T, collector: (collection: R, key: K, value: T[K], index: number) => void, collection?: R) => R}
 */
export function collectProps(object, collector, collection = {}) {
	assert(isObjectValue(object), `"object" is required, must be a not a null.`);

	Object.keys(object).forEach((key, index) => collector(collection, key, object[key], index));

	return collection;
}

/**
 * Creates a new object based on the provided `object` with properties copied over, but filtered by the `mapper` function.
 * @type {<R extends { [key: string]: any }, T extends R>(object: T, predicate: (key: K, value: T[K], index: number) => boolean) => R}
 */
export function filterProps(object, predicate) {
	assertFunctor(predicate, `predicate`);

	return collectProps(object, (c, k, v, i) => {
		if (predicate(k, v, i)) {
			c[k] = v;
		}
	});
}

/**
 * Creates a new object based on the provided `object` with its keys passed through the `mapper` function and values copied over.
 * @type {<T extends { [key: string]: any }, K extends keyof T, R extends { [key: string]: any }>(object: T, mapper: (key: K, value: T[K], index: number) => string) => R}
 */
export function mapKeys(object, mapper) {
	assertFunctor(mapper, `mapper`);

	return collectProps(object, (r, k, v, i) => (r[mapper(k, v, i)] = v));
}

/**
 * Creates a new object based on the provided `object` with its keys copied over and values passed through the `mapper` function.
 * @type {<T extends { [key: string]: any }, K extends keyof T>(object: T, mapper: (key: K, value: T[K], index: number) => any) => T}
 */
export function mapValues(object, mapper) {
	assertFunctor(mapper, `mapper`);

	return collectProps(object, (c, k, v, i) => (c[k] = mapper(k, v, i)));
}

/**
 * Helps to reduce provided `object` into some value by passing its keys and values through the the `reducer`.
 * @type {<T extends { [key: string]: any }, K extends keyof T, R>(object: T, reducer: (previous: R, key: K, value: T[K], index: number) => R, initial: R) => R}
 */
export function reduceProps(object, reducer, initial) {
	assert(isObjectValue(object), `"object" is required, must be a not a null.`);

	Object.keys(object).forEach((key, index) => (initial = reducer(initial, key, object[key], index)));

	return initial;
}
