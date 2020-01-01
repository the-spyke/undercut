export function getDoneItem(value) {
	return { value, done: true };
}

/**
 * @param {any} [value]
 * @returns {any}
 */
export function identity(value) {
	return value;
}

/**
 * Changes the sign of the `value`.
 * @param {number} value
 * @returns {number}
 */
export function negate(value) {
	return -value;
}

/**
 * @returns {void}
 */
export function noop() {
	// Empty.
}

/**
 * Applies logical not `!` operator to the `value`.
 * @param {any} value
 * @returns {boolean}
 */
export function not(value) {
	return !value;
}

/**
 * @param {any} error
 * @returns {void}
 */
export function rethrow(error) {
	throw error;
}
