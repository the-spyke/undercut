export function mapPull(predicate) {
	return function* (iterable) {
		for (const item of iterable) {
			yield predicate(item);
		}
	};
}
