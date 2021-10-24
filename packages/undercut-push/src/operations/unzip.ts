import type { Mapper, PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, close, Cohort, identity, isFunction } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function unzip<T>(): PushOperation<T[]> {
	return unzipWith(identity);
}

export function unzipWith<T, R>(itemsExtractor: Mapper<T, R[]>): PushOperation<T, R[]> {
	assert(isFunction(itemsExtractor), `"itemsExtractor" is required, must be a function.`);

	return asPushOperation<T, R[]>(function* (observer) {
		const cohort = Cohort.of(observer);
		const results: R[][] = [];

		try {
			let index = 0;

			while (true) {
				const item: T = yield;
				const values = itemsExtractor(item, index);

				if (results.length === 0) {
					values.forEach(() => results.push([]));
				} else if (results.length !== values.length) {
					throw new Error(`"itemsExtractor" returns variable length arrays: was ${results.length}, now ${values.length}`);
				}

				values.forEach((v, i) => results[i].push(v));

				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (const result of results) {
						observer.next(result);
					}
				}
			});
		}
	});
}
