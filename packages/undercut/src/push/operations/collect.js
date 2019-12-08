import { assertFunctor } from "../../utils/assert.js";
import { abort, asObserver, close, Cohort } from "../../utils/coroutine.js";

export function collect(collector, factory) {
	assertFunctor(collector, `collector`);
	assertFunctor(factory, `factory`);

	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);
		const collection = factory();

		try {
			let index = 0;

			while (true) {
				collector(collection, yield, index);
				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					observer.next(collection);
				}
			});
		}
	});
}
