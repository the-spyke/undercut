import type { PullOperation } from "@undercut/types";

export function last<T>(): PullOperation<T>  {
	return function* (iterable) {
		let lastItem = undefined;
		let hasItems = false;

		for (const item of iterable) {
			lastItem = item;
			hasItems = true;
		}

		if (hasItems) {
			yield lastItem as T;
		}
	};
}
