import type { Comparator } from "@undercut/types";

/**
 * A comparator for string values.
 */
export const strings: Comparator<string> = (a, b) => {
	if (a < b) {
		return -1;
	}

	if (a > b) {
		return 1;
	}

	return 0;
};

/**
 * A comparator for number values.
 */
export const numbers: Comparator<number> = (a, b) => {
	return a - b;
}

/**
 * A comparator for any values, converts arguments to strings as in `Array.prototype.sort()`.
 */
export const classic: Comparator<unknown> = (a, b) => {
	return strings(String(a), String(b));
}
