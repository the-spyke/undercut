export function first() {
	return function* (iterable) {
		for (const item of iterable) {
			yield item;

			return;
		}
	};
}
