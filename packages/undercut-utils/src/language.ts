import type { Defined, Falsy, Nullish } from "@undercut/types";

const objectPrototype: Object = Object.getPrototypeOf({});

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

export function isCoroutine<T = unknown>(value: T | unknown): value is Iterator<T> {
	return isObjectValue(value) && isFunction((value as any).next);
}

export function isDate(value: unknown): value is Date {
	return value instanceof Date;
}

export function isDefined(value: unknown): value is Defined {
	return value !== undefined;
}

export function isError(value: unknown): value is Error {
	return value instanceof Error;
}

export function isFalsy<T>(value: T | Falsy): value is Falsy {
	return !value;
}

export function isFunction(value: unknown): value is Function {
	return typeof value === `function`;
}

export function isIterable<T>(value: unknown): value is Iterable<T> {
	return isObjectValue(value) ? isFunction((value as any)[Symbol.iterator]) : isString(value);
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
 */
export function isNumberValue(value: unknown): value is number {
	return isNumber(value) && !Number.isNaN(value);
}

export function isObject(value: unknown): value is object | null {
	return typeof value === `object`;
}

/**
 * Checks if the `value` is an object, but not `null`.
 */
export function isObjectValue(value: unknown): value is object {
	return isObject(value) && value !== null;
}

export { isCoroutine as isObserver };

export function isPlainObject(value: unknown): value is object {
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

export function isSymbol(value: unknown): value is symbol {
	return typeof value === `symbol`;
}

export function isTruthy<T>(value: T | Falsy): value is T {
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
