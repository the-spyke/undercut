export function identity(value) {
	return value;
}

export function negate(predicate) {
	return function (...args) {
		return !predicate(...args);
	}
}

export function negateSign(operation) {
	return function (...args) {
		return -1 * operation(...args);
	}
}

export function noop() { }
