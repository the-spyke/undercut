export function map(mapper) {
	return function* (iterable) {
		for (const item of iterable) {
			yield mapper(item);
		}
	};
}
