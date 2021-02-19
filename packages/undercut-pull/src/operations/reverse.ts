import type { PullOperation } from "@undercut/types";

export function reverse<T>(): PullOperation<T> {
	return function* (iterable) {
		const items = [...iterable];

		for (let i = items.length - 1; i >= 0; i--) {
			yield items[i];
		}
	};
}
