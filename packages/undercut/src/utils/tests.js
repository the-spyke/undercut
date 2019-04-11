export function first(source, operation, ...args) {
	for (const item of operation(...args)(source)) {
		return item;
	}
}
