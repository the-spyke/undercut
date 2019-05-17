/**
 * @param {any} [value]
 * @returns {any}
 */
export function identity(value) {
	return value;
}

/**
 * Applies boolean negation to the predicate's return value.
 * @param {Function} predicate
 * @return {Function}
 */
export function negate(predicate) {
	return function (...args) {
		return !predicate(...args);
	}
}

/**
 * Multiplies the predicate's return value by `-1`.
 * @param {Function} predicate
 * @return {Function}
 */
export function negateSign(operation) {
	return function (...args) {
		return -1 * operation(...args);
	}
}

/**
 * @returns {void}
 */
export function noop() { }
