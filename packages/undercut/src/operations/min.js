export function minPull() {
	return function* (iterable) {
		let min = null;

		for (const item of iterable) {
			if (min === null || item < min) {
				min = item;
			}
		}

		if (min === null) {
			return;
		}

		yield min;
	};
}
