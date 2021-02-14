import type { Nullish } from "@undercut/types";


const objectPrototype = Object.getPrototypeOf({});

/**
 * Gets value's type from "Object.prototype.toString" method. For example, an async function will return "AsyncFunction".
 * Use for data passed between different contexts, where "instanceof" doesn't work.
 */
export function getObjectType(value: unknown): string {
	const type = objectPrototype.toString.call(value);

	return type.substring(8, type.length - 1); // Remove "[object " and the closing bracket.
}

export function hasOwnProps(value: unknown): boolean {
	return isObjectValue(value) && Object.keys(value).length > 0;
}

export function isArrayBuffer(value: unknown): value is ArrayBuffer {
	return value instanceof ArrayBuffer;
}

export function isBoolean(value: unknown): value is boolean {
	return typeof value === `boolean`;
}

// TODO:
export function isCoroutine(value: unknown): value is { next: Function } {
	return isObjectValue(value) && isFunction(value.next);
}

export function isDate(value: unknown): value is Date {
	return value instanceof Date;
}

// TODO:
export function isDefined(value: unknown) {
	return value !== undefined;
}

export function isError(value: unknown): value is Error {
	return value instanceof Error;
}

export function isFalsy(value: unknown): boolean {
	return !value;
}

export function isFunction(value: unknown): value is Function {
	return typeof value === `function`;
}

// TODO:
export function isIterable(value: unknown): boolean {
	return isObjectValue(value) ? isFunction(value[Symbol.iterator]) : isString(value);
}

export { isCoroutine as isIterator };

export function isMap<K = unknown, V = unknown>(value: unknown): value is Map<K, V> {
	return value instanceof Map;
}

export function isNegative(value: unknown): boolean {
	return isNumberValue(value) && value < 0;
}

export function isNegativeOrZero(value: unknown): boolean {
	return isNumberValue(value) && value <= 0;
}

export function isNull(value: unknown): value is null {
	return value === null;
}

/**
 * Checks if the `value` is `null` or `undefined`.
 */
export function isNullish(value: unknown): value is Nullish {
	return value == null;
}

export function isNumber(value: unknown): value is Number {
	return typeof value === `number`;
}

/**
 * Checks if the `value` is a number, but not `NaN`.
 * TODO:
 */
export function isNumberValue(value: unknown): value is number {
	return isNumber(value) && !Number.isNaN(value);
}

export function isObject(value: unknown): value is Object {
	return typeof value === `object`;
}

/**
 * Checks if the `value` is an object, but not `null`.
 * TODO:
 */
export function isObjectValue(value: unknown): value is Object {
	return isObject(value) && value !== null;
}

export { isCoroutine as isObserver };

export function isPlainObject(value: unknown): value is Object {
	if (!isObjectValue(value)) {
		return false;
	}

	const proto = Object.getPrototypeOf(value);

	return proto === objectPrototype || proto === null;
}

export function isPositive(value: unknown): boolean {
	return isNumberValue(value) && value > 0;
}

export function isPositiveOrZero(value: unknown): boolean {
	return isNumberValue(value) && value >= 0;
}

export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
	return value instanceof Promise;
}

export function isRegExp(value: unknown): value is RegExp {
	return value instanceof RegExp;
}

export function isSet<T = unknown>(value: unknown): value is Set<T> {
	return value instanceof Set;
}

export function isString(value: unknown): value is string {
	return typeof value === `string`;
}

export function isSymbol(value: unknown): value is Symbol {
	return typeof value === `symbol`;
}

export function isTruthy(value: unknown): boolean {
	return Boolean(value);
}

export function isUndefined(value: unknown): value is undefined {
	return value === undefined;
}

export function isWeakMap<K extends object = {}, V = unknown>(value: unknown): value is WeakMap<K, V> {
	return value instanceof WeakMap;
}

export function isWeakSet<T extends object = {}>(value: unknown): value is WeakSet<T> {
	return value instanceof WeakSet;
}
