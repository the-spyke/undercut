export function maxPull() {
	return function* (iterable) {
		let max = null;

		for (const item of iterable) {
			if (max === null || item > max) {
				max = item;
			}
		}

		if (max === null) {
			return;
		}

		yield max;
	};
}
