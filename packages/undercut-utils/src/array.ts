import type { Predicate } from "@undercut/types";

/**
 * Like `Array.prototype.filter()`, but works in place by mutating the array.
 * @returns The same array that was passed as the argument.
 */
export function filterInPlace<T>(array: Array<T>, predicate: Predicate<T>): Array<T> {
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

	return array;
}

/**
 * Defines maximum possible length of an Array.
*/
export const MAX_LENGTH = Math.pow(2, 32) - 1;

/**
 * Modifies the `array` by swapping elements at specified indexes.
 * @returns The same array that was passed as the argument.
 */
export function swapElements<T>(array: Array<T>, indexA: number, indexB: number): Array<T> {
	const temp = array[indexA];

	array[indexA] = array[indexB];
	array[indexB] = temp;

	return array;
}
