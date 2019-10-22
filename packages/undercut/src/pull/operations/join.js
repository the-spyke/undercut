export function join(separator = `,`) {
	separator = String(separator);

	return function* (iterable) {
		let result = null;

		for (const item of iterable) {
			const value = item != null ? String(item) : ``;

			if (result !== null) {
				result += `${separator}${value}`;
			} else {
				result = value;
			}
		}

		yield result || ``;
	};
}
