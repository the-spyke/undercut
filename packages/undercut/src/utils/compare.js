export function strings(a, b) {
	if (a < b) {
		return -1;
	}

	if (a > b) {
		return 1;
	}

	return 0;
}

export function numbers(a, b) {
	return a - b;
}

export function classic(a, b) {
	return strings(String(a), String(b));
}
