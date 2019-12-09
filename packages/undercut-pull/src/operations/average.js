export function average() {
	return function* (iterable) {
		let sum = 0;
		let count = 0;

		for (const item of iterable) {
			sum += item;
			count += 1;
		}

		yield count && sum / count;
	};
}
