import type { PullOperation } from "@undercut/types";

export function first<T>(): PullOperation<T> {
	return function* (iterable) {
		for (const item of iterable) {
			yield item;

			return;
		}
	};
}
