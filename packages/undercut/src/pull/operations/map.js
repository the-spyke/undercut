export function mapPull(mapper) {
	return function* (iterable) {
		for (const item of iterable) {
			yield mapper(item);
		}
	};
}
