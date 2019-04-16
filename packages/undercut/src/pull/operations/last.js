export function last() {
	return function* (iterable) {
		let lastItem = undefined;
		let hadItems = false;

		for (const item of iterable) {
			lastItem = item;
			hadItems = true;
		}

		if (hadItems) {
			yield lastItem;
		}
	};
}
