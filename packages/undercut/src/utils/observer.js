import { isFunction } from "./language.js";

export function initializeObserver(oberver) {
	oberver.next();

	return oberver;
}

export function tryCloseObserver(observer) {
	if (isFunction(observer.return)) {
		observer.return();

		return true;
	}

	return false;
}
