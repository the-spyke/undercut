import { isFunction } from "./language.js";

export function initializeObserver(oberver) {
	oberver.next();

	return oberver;
}

export function makeUnclosable(observer) {
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

export function tryCloseObserver(observer) {
	if (isFunction(observer.return)) {
		observer.return();

		return true;
	}

	return false;
}
