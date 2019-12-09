export function last() {
	return function* (iterable) {
		let lastItem = undefined;
		let hasItems = false;

		for (const item of iterable) {
			lastItem = item;
			hasItems = true;
		}

		if (hasItems) {
			yield lastItem;
		}
	};
}
