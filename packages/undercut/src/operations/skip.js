export function skipPull(count) {
	return function* (iterable) {
		let i = 0;
		for (const item of iterable) {
			if (i >= count) {
				yield item;
			} else {
				i += 1;
			}
		}
	};
}
