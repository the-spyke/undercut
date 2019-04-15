export function forEach(action) {
	return function* (iterable) {
		for (const item of iterable) {
			action(item);

			yield item;
		}
	};
}
