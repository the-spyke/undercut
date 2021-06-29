import type { Observer, PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, asObserver, close, Cohort, identity, isPositiveOrZero } from "@undercut/utils";

export function buffer<T>(size: number): PushOperation<T> {
	assert(isPositiveOrZero(size), `"size" is required, must be a number >= 0.`);

	size = Math.trunc(size);

	if (size < 2) {
		return identity;
	}

	return asObserver(function* (observer: Observer<T>) {
		const cohort = Cohort.of(observer);
		const buffer = new Array<T>(size);

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

export function bufferAll<T>(): PushOperation<T> {
	return asObserver(function* (observer: Observer<T>) {
		const cohort = Cohort.of(observer);
		const buffer: T[] = [];

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
