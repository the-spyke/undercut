export function toArray(line) {
	const result = Array.from(line);
	console.log(result);
	return result;
}

export function toMap(line) {
	const result = new Map(line);
	console.log(result);
	return result;
}

export function toObject(line) {
	const result = {};

	for (const [key, value] of line) {
		result[key] = value;
	}

	console.log(result);

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
	const result = new Set(line);
	console.log(result);
	return result;
}

export function toValue(line) {
	let i = 0;
	let result;

	for (const item of line) {
		result = item;
		i += 1;

		if (i > 1) {
			throw new Error(`"toValue()" may be applied only to a sequence of one item.`);
		}
	}

	console.log(result);

	return result;
}
