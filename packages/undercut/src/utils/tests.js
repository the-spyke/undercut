export function targetOf(operation, source) {
	return [...operation(source)];
}
