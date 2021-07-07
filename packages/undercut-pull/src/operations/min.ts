import type { PullOperation } from "@undercut/types";

export function min(): PullOperation<number> {
	return function* (iterable) {
		let min: number | null = null;

		for (const item of iterable) {
			if (min === null || item < min) {
				min = item;
			}
		}

		if (min !== null) {
			yield min;
		}
	};
}
