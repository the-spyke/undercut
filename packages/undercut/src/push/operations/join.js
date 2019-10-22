import { closeObserver } from "../../utils/observer.js";

export function join(separator = `,`) {
	separator = String(separator);

	return function* (observer) {
		let success = true;
		let result = null;

		try {
			while (true) {
				const item = yield;
				const value = item != null ? String(item) : ``;

				if (result !== null) {
					result += `${separator}${value}`;
				} else {
					result = value;
				}
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				observer.next(result || ``);
			}

			closeObserver(observer);
		}
	};
}
