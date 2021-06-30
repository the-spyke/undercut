import { asPushOperation, composeOperations, pushArray, pushLine } from "@undercut/push";
import { abort, close, identity } from "@undercut/utils";

import { runPerfSuite } from "../perf.js";

function scanToSet(keys, selector, source) {
	for (const item of source) {
		const key = selector(item);

		if (!keys.has(key)) {
			keys.add(key);
		}
	}
}

function differenceByImperative(selector, ...sources) {
	return asPushOperation(function* (observer) {
		try {
			let keys = null;

			while (true) {
				const item = yield;
				const key = selector(item);

				if (!keys) {
					keys = new Set();

					for (const source of sources) {
						scanToSet(keys, selector, source);
					}
				}

				if (!keys.has(key)) {
					observer.next(item);
				}
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}

function filter(predicate) {
	return asPushOperation(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item = yield;

				if (predicate(item, index)) {
					observer.next(item);
				}

				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}

function differenceByComposed(selector, ...sources) {
	return function (observer) {
		let keys = null;

		return filter(item => {
			const key = selector(item);

			if (!keys) {
				keys = new Set();

				for (const source of sources) {
					scanToSet(keys, selector, source);
				}
			}

			return !keys.has(key);
		})(observer);
	};
}

function differenceByComposed2(selector, ...sources) {
	return function (observer) {
		let keys = null;

		return pushLine([
			filter(item => {
				const key = selector(item);

				if (!keys) {
					keys = new Set();

					for (const source of sources) {
						scanToSet(keys, selector, source);
					}
				}

				return !keys.has(key);
			})
		], observer);
	};
}

function differenceByComposed3(selector, ...sources) {
	return composeOperations(() => {
		let keys = null;

		return [
			filter(item => {
				const key = selector(item);

				if (!keys) {
					keys = new Set();

					for (const source of sources) {
						scanToSet(keys, selector, source);
					}
				}

				return !keys.has(key);
			})
		];
	});
}

function fillData(n) {
	const data = Array(n);

	for (let index = 0; index < n; index++) {
		data[index] = Math.trunc(Math.random() * 100);
	}

	return data;
}

const data1 = fillData(2000);
const data2 = fillData(1000);
const data3 = fillData(1000);

runPerfSuite(`push_composed-vs-imperative`, {
	"imperative": () => {
		pushArray([
			differenceByImperative(identity, data2),
			differenceByImperative(identity, data3),
		], data1);
	},
	"composed": () => {
		pushArray([
			differenceByComposed(identity, data2),
			differenceByComposed(identity, data3),
		], data1);
	},
	"composed2": () => {
		pushArray([
			differenceByComposed2(identity, data2),
			differenceByComposed2(identity, data3),
		], data1);
	},
	"composed3": () => {
		pushArray([
			differenceByComposed3(identity, data2),
			differenceByComposed3(identity, data3),
		], data1);
	},
});
