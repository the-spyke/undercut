export function toArray(line) {
	return Array.from(line);
}

export function toMap(line) {
	return new Map(line);
}

export function toObject(line) {
	// const result = Object.fromEntries(line);
	const result = {};

	for (const [key, value] of line) {
		result[key] = value;
	}

	return result;
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

export function toSet(line) {
	return new Set(line);
}

export function toValue(line) {
	let result = undefined;
	let i = 0;

	for (const item of line) {
		if (i >= 1) {
			throw new Error(`"toValue()" may be applied only to a sequence of one item.`);
		}

		result = item;
		i += 1;
	}

	return result;
}
