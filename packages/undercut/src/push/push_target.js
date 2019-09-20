export function toArray(array) {
	return toConsumer(item => array.push(item));
}

export function* toConsumer(consumer) {
	let item = null;

	try {
		while (true) {
			item = yield;

			console.log(`toArray {${item}}`);

			consumer(item);
		}
	} finally {
		// Empty
		console.log(`toArray in finally`);
	}
}
