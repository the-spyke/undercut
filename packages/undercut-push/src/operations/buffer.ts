import type { PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, close, Cohort, identity, isPositiveOrZero } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function buffer<T>(size: number): PushOperation<T> {
	assert(isPositiveOrZero(size), `"size" is required, must be a number >= 0.`);

	size = Math.trunc(size);

	if (size < 2) {
		return identity;
	}

	return asPushOperation<T>(function* (observer) {
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
	return asPushOperation<T>(function* (observer) {
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
