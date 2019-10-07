/**
 * @param {any} value
 * @returns {boolean}
 */
export function isBoolean(value) {
	return typeof value === "boolean";
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isDefined(value) {
	return typeof value !== "undefined";
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
	return typeof value === "function";
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isIterable(value) {
	return value != null && isFunction(value[Symbol.iterator]);
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isIterator(value) {
	return isObjectValue(value) && isFunction(value.next);
}

/**
 * Checks if the `value` is `null` or `undefined`.
 * @param {any} value
 * @returns {boolean}
 */
export function isNil(value) {
	return value == null;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isNegative(value) {
	return isNumberValue(value) && value < 0
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isNegativeOrZero(value) {
	return isNumberValue(value) && value <= 0
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isNull(value) {
	return value === null;
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isNumber(value) {
	return typeof value === "number";
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
	return typeof value === "object";
}

/**
 * Checks if the `value` is an object, but not `null`.
 * @param {any} value
 * @returns {boolean}
 */
export function isObjectValue(value) {
	return value != null && isObject(value);
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isObserver(value) {
	return isObjectValue(value) && isFunction(value.next) && isFunction(value.return) && isFunction(value.throw);
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isPositive(value) {
	return isNumberValue(value) && value > 0
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isPositiveOrZero(value) {
	return isNumberValue(value) && value >= 0
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isString(value) {
	return typeof value === "string";
}

/**
 * @param {any} value
 * @returns {boolean}
 */
export function isSymbol(value) {
	return typeof value === "symbol";
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
	return typeof value === "undefined";
}
