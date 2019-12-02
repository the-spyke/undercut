import { rethrow } from "./function.js";
import { isFunction } from "./language.js";

export function close(closable) {
	if (isFunction(closable.return)) {
		closable.return();
	}
}

function unclosableReturn(value) {
	return { value, done: true };
}

export function asUnclosable(closable) {
	const unclosable = {
		next: closable.next.bind(closable)
	};

	if (isFunction(closable.return)) {
		unclosable.return = unclosableReturn;
	}

	if (isFunction(closable.throw)) {
		unclosable.throw = rethrow;
	}

	return unclosable;
}

export function useClosable(closable, usage) {
	try {
		return usage(closable);
	} finally {
		close(closable);
	}
}
