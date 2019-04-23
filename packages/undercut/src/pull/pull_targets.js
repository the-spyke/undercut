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

// export function toPushLine(pushLine) {
// 	return function (pullLine) {
// 		try {
// 			for (const item of pullLine) {
// 				pushLine.next(item);
// 			}
// 		} finally {
// 			pushLine.return();
// 		}
// 	}
// }

export function toSet(pullLine) {
	return new Set(pullLine);
}

export function toValue(pullLine) {
	let result = undefined;
	let index = 0;

	for (const item of pullLine) {
		assert(index === 0, `"toValue()" may be applied only to a sequence of one item.`);

		result = item;
		index++;
	}

	return result;
}
