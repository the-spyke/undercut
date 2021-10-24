import type { PullOperation } from "@undercut/types";

export function join<T>(separator = `,`): PullOperation<T, string> {
	separator = String(separator);

	return function* (iterable) {
		let result = ``;
		let separate = false;

		for (const item of iterable) {
			const value = item != null ? String(item) : ``;

			if (separate) {
				result += `${separator}${value}`;
			} else {
				result += value;
				separate = true;
			}
		}

		yield result;
	};
}
