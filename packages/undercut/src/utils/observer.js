import { assert } from "./assert.js";
import { isFunction, isObserver } from "./language.js";

export function closeObserver(observer) {
	if (isFunction(observer.return)) {
		observer.return();
	}
}

export function initializeObserver(oberver) {
	oberver.next();

	return oberver;
}

export function makeObserverUnclosable(observer) {
	assert(isObserver(observer), `"observer" is required and must be an Observer.`);

	return {
		next(value) {
			observer.next(value);
		},
		return() {
			// Empty.
		},
		throw(e) {
			throw e;
		}
	};
}
