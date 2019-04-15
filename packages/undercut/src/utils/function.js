export function identity(value) {
	return value;
}

export function negate(predicate) {
	return function (...args) {
		return !predicate(...args);
	}
}

export function negateSign(func) {
	return function (...args) {
		return -1 * func(...args);
	}
}

export function noop() { }
