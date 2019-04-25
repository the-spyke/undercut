export function isArray(value) {
	return Array.isArray(value);
}

export function isBoolean(value) {
	return typeof value === "boolean";
}

export function isDefined(value) {
	return typeof value !== "undefined";
}

export function isFalsy(value) {
	return !value;
}

export function isFinite(value) {
	return Number.isFinite(value);
}

export function isFunction(value) {
	return typeof value === "function";
}

export function isIterable(value) {
	// TODO: improve condition
	return value != null && isFunction(value[Symbol.iterator] || value.next);
}

export function isNil(value) {
	return value == null;
}

export function isNull(value) {
	return value === null;
}

export function isNumber(value) {
	return typeof value === "number";
}

export function isObject(value) {
	return typeof value === "object";
}

export function isString(value) {
	return typeof value === "string";
}

export function isSymbol(value) {
	return typeof value === "symbol";
}

export function isTruthy(value) {
	return !!value;
}

export function isUndefined(value) {
	return typeof value === "undefined";
}
