/**
 * Like `Array.prototype.filter()`, but works in place by mutating the array.
 * @param {Array} array
 * @param {Function} predicate
 * @returns {void}
 */
export function filterInPlace(array, predicate) {
	let holeStart = 0;
	let holeLength = 0;

	for (let index = 0; index < array.length; index++) {
		const item = array[index];
		const filter = predicate(item, index);

		if (filter) {
			array[holeStart] = item;
			holeStart++;
		} else {
			holeLength++;
		}
	}

	array.length -= holeLength;
}

/**
 * Defines maximum possible length of an Array.
*/
export const MAX_LENGTH = Math.pow(2, 32) - 1;

/**
 * Modifies the `array` by swapping elements at specified indexes.
 * @param {Array} array
 * @param {Number} indexA
 * @param {Number} indexB
 * @returns {void}
 */
export function swapElements(array, indexA, indexB) {
	const temp = array[indexA];

	array[indexA] = array[indexB];
	array[indexB] = temp;
}
