/**
 * A re-export of `Array.isArray` for consistency.
 */
export const isArray = Array.isArray;

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isBoolean(value) {
	return typeof value === `boolean`;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isCoroutine(value) {
	return isObjectValue(value) && isFunction(value.next);
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isDefined(value) {
	return typeof value !== `undefined`;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isFalsy(value) {
	return !value;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isFunction(value) {
	return typeof value === `function`;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isIterable(value) {
	return !isNullish(value) && isFunction(value[Symbol.iterator]);
}

export { isCoroutine as isIterator };

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isNegative(value) {
	return isNumberValue(value) && value < 0;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isNegativeOrZero(value) {
	return isNumberValue(value) && value <= 0;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isNull(value) {
	return value === null;
}

/**
 * Checks if the `value` is `null` or `undefined`.
 * @param {any} value
 * @returns {boolean}
 */
export function isNullish(value) {
	return value == null;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isNumber(value) {
	return typeof value === `number`;
}

/**
 * Checks if the `value` is a number, but not `NaN`.
 * @param {any} value
 * @returns {boolean}
 */
export function isNumberValue(value) {
	return isNumber(value) && !Number.isNaN(value);
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isObject(value) {
	return typeof value === `object`;
}

/**
 * Checks if the `value` is an object, but not `null`.
 * @param {any} value
 * @returns {boolean}
 */
export function isObjectValue(value) {
	return isObject(value) && value !== null;
}

export { isCoroutine as isObserver };

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isPositive(value) {
	return isNumberValue(value) && value > 0;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isPositiveOrZero(value) {
	return isNumberValue(value) && value >= 0;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isString(value) {
	return typeof value === `string`;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isSymbol(value) {
	return typeof value === `symbol`;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isTruthy(value) {
	return !!value;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isUndefined(value) {
	return typeof value === `undefined`;
}
