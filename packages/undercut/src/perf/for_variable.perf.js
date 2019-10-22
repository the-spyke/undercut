import { runPerfSuite } from "../utils/perf.js";

const n = 100;

function fn0() {
	return 4;
}

function fn1(a) {
	return 4 + a;
}

function fn2(a, b) {
	return 4 + a + b;
}

runPerfSuite(`for-variable`, {
	"0-params-0-args": () => {
		for (let i = 0; i < n; i++) {
			fn0();
		}
	},
	"0-params-1-args": () => {
		for (let i = 0; i < n; i++) {
			fn0(i);
		}
	},
	"0-params-2-args": () => {
		for (let i = 0, x = 0; i < n; i++) {
			fn0(i, x);
			x += 2;
		}
	},
	"1-params-0-args": () => {
		for (let i = 0; i < n; i++) {
			fn1();
		}
	},
	"1-params-1-args": () => {
		for (let i = 0; i < n; i++) {
			fn1(i);
		}
	},
	"1-params-2-args": () => {
		for (let i = 0, x = 0; i < n; i++) {
			fn1(i, x);
			x += 2;
		}
	},
	"2-params-0-args": () => {
		for (let i = 0; i < n; i++) {
			fn2();
		}
	},
	"2-params-1-args": () => {
		for (let i = 0; i < n; i++) {
			fn2(i);
		}
	},
	"2-params-2-args": () => {
		for (let i = 0, x = 0; i < n; i++) {
			fn2(i, x);
			x += 2;
		}
	},
});
