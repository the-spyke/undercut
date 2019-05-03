import { assert } from "../utils/assertions.js";

export function toArray(pullLine) {
	return Array.from(pullLine);
}

export function toMap(pullLine) {
	return new Map(pullLine);
}

export function toObject(pullLine) {
	return Object.fromEntries(pullLine);
}

export function toSet(pullLine) {
	return new Set(pullLine);
}

export function toValue(pullLine) {
	let value = undefined;
	let isFirstValue = true;

	for (const item of pullLine) {
		assert(isFirstValue, `"toValue()" may be applied only to a sequence of one item.`);

		value = item;
		isFirstValue = false;
	}

	return value;
}
