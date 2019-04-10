export function takePull(count) {
	return function* (iterable) {
		let i = 0;
		for (const item of iterable) {
			if (i >= count) {
				return;
			}
			yield item;
			i += 1;
		}
	};
}
