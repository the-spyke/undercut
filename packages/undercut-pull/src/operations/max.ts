import type { PullOperation } from "@undercut/types";

export function max(): PullOperation<number> {
	return function* (iterable) {
		let max: number | null = null;

		for (const item of iterable) {
			if (max === null || item > max) {
				max = item;
			}
		}

		if (max !== null) {
			yield max;
		}
	};
}
