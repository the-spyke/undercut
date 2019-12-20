import { zipWith as zipArray } from "@undercut/pull";
import { simulatePull } from "@undercut/testing";
import { identity } from "@undercut/utils";

import { runPerfSuite } from "../perf.js";

const a = [1, 2, 3, 4, 5];
const b = [6, 7, 8, 9, 0];
const c = [4, 2, 7, 5, 1];
const d = [9, 0, 3, 6, 8];

function arrayDestruct2([x, y]) {
	return x + y;
}

function arrayDestruct3([x, y, z]) {
	return x + y + z;
}

function arrayDestruct4([x, y, z, z2]) {
	return x + y + z + z2;
}

function restArgs(...args) {
	return args;
}

function manual2(x, y) {
	return [x, y];
}

function manual3(x, y, z) {
	return [x, y, z];
}

function manual4(x, y, z, z2) {
	return [x, y, z, z2];
}

runPerfSuite(`zip-reducer-argumemts`, {
	"fixed-x2": () => {
		return simulatePull(zip1(manual2, b), a);
	},
	"fixed-x3": () => {
		return simulatePull(zip3(manual3, b, c), a);
	},
	"fixed-x4": () => {
		return simulatePull(zip4(manual4, b, c, d), a);
	},

	"multiple-array-x2": () => {
		return simulatePull(zipArray(identity, b), a);
	},
	"multiple-array-x3": () => {
		return simulatePull(zipArray(identity, b, c), a);
	},
	"multiple-array-x4": () => {
		return simulatePull(zipArray(identity, b, c, d), a);
	},

	"multiple-array-destruct-x2": () => {
		return simulatePull(zipArray(arrayDestruct2, b), a);
	},
	"multiple-array-destruct-x3": () => {
		return simulatePull(zipArray(arrayDestruct3, b, c), a);
	},
	"multiple-array-destruct-x4": () => {
		return simulatePull(zipArray(arrayDestruct4, b, c, d), a);
	},

	"multiple-args-x2": () => {
		return simulatePull(zipArgs(restArgs, b), a);
	},
	"multiple-args-x3": () => {
		return simulatePull(zipArgs(restArgs, b, c), a);
	},
	"multiple-args-x4": () => {
		return simulatePull(zipArgs(restArgs, b, c, d), a);
	},

	"multiple-args-manual-x2": () => {
		return simulatePull(zipArgs(manual2, b), a);
	},
	"multiple-args-manual-x3": () => {
		return simulatePull(zipArgs(manual3, b, c), a);
	},
	"multiple-args-manual-x4": () => {
		return simulatePull(zipArgs(manual4, b, c, d), a);
	},
});

function zip1(factory, source2) {
	return function* (iterable) {
		const iter1 = iterable[Symbol.iterator]();
		const iter2 = source2[Symbol.iterator]();

		while (true) {
			const item1 = iter1.next();
			const item2 = iter2.next();

			if (item1.done && item2.done) {
				break;
			}

			yield factory(item1.value, item2.value);
		}
	};
}

function zip3(factory, source2, source3) {
	return function* (iterable) {
		const iter1 = iterable[Symbol.iterator]();
		const iter2 = source2[Symbol.iterator]();
		const iter3 = source3[Symbol.iterator]();

		while (true) {
			const item1 = iter1.next();
			const item2 = iter2.next();
			const item3 = iter3.next();

			if (item1.done && item2.done && item3.done) {
				break;
			}

			yield factory(item1.value, item2.value, item3.value);
		}
	};
}

function zip4(factory, source2, source3, source4) {
	return function* (iterable) {
		const iter1 = iterable[Symbol.iterator]();
		const iter2 = source2[Symbol.iterator]();
		const iter3 = source3[Symbol.iterator]();
		const iter4 = source4[Symbol.iterator]();

		while (true) {
			const item1 = iter1.next();
			const item2 = iter2.next();
			const item3 = iter3.next();
			const item4 = iter4.next();

			if (item1.done && item2.done && item3.done && item4.done) {
				break;
			}

			yield factory(item1.value, item2.value, item3.value, item4.value);
		}
	};
}

function zipArgs(factory, ...sources) {
	return function* (iterable) {
		const iters = [iterable[Symbol.iterator]()];

		sources.forEach(source => iters.push(source[Symbol.iterator]()));

		while (true) {
			let done = true;

			const values = iters.map(iter => {
				const item = iter.next();

				done = done && item.done;

				return item.value;
			});

			if (done) {
				break;
			}

			yield factory(...values);
		}
	};
}
