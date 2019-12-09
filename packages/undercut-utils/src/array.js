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
