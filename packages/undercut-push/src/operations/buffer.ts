import { assert } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";
import { identity } from "@undercut/utils/src/function.js";
import { isPositiveOrZero } from "@undercut/utils/src/language.js";

export function buffer(size) {
	assert(isPositiveOrZero(size), `"size" is required, must be a number >= 0.`);

	size = Math.trunc(size);

	if (size < 2) {
		return identity;
	}

	return asObserver(function* (observer) {
		const cohort = Cohort.of(observer);
		const buffer = new Array(size);

		let count = 0;

		try {
			while (true) {
				if (count < size) {
					buffer[count] = yield;
					count++;
				}

				if (count >= size) {
					for (const dataItem of buffer) {
						observer.next(dataItem);
					}

					count = 0;
				}
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (let index = 0; index < count; index++) {
						observer.next(buffer[index]);
					}
				}
			});
		}
	});
}

export function bufferAll() {
	return asObserver(function* (observer) {
		const cohort = Cohort.of(observer);
		const buffer = [];

		try {
			while (true) {
				buffer.push(yield);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (const item of buffer) {
						observer.next(item);
					}
				}
			});
		}
	});
}
