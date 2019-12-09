export function reverse() {
	return function* (iterable) {
		const items = [...iterable];

		for (let i = items.length - 1; i >= 0; i--) {
			yield items[i];
		}
	};
}
