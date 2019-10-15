/**
 * A comparator for string values.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function strings(a, b) {
	if (a < b) {
		return -1;
	}

	if (a > b) {
		return 1;
	}

	return 0;
}

/**
 * A comparator for number values.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function numbers(a, b) {
	return a - b;
}

/**
 * A comparator for any values, converts arguments to strings as in `Array.prototype.sort()`.
 * @param {any} a
 * @param {any} b
 * @returns {number}
 */
export function classic(a, b) {
	return strings(String(a), String(b));
}
