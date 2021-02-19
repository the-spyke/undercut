import type { PullOperation } from "@undercut/types";

export function includes<T>(value: T): PullOperation<T, boolean> {
	return function* (iterable) {
		for (const item of iterable) {
			if (item === value) {
				yield true;

				return;
			}
		}

		yield false;
	};
}
