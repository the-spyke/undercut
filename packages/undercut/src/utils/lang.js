export function isFunction(value) {
	return typeof value === "function";
}

export function isIterable(value) {
	// TODO: improve condition
	return value != null && isFunction(value[Symbol.iterator] || value.next);
}

export function isNull(value) {
	return value === null;
}

export function isNullOrUndef(value) { // TODO: improve naming
	return value == null;
}

export function isUndefined(value) {
	return value === undefined;
}

export function isTrue(value) {
	return Boolean(value);
}
