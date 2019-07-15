/* eslint-disable no-console */

import Benchmark from "benchmark";

export function runPerfSuite(name, tests) {
	const suite = Benchmark.Suite(name);

	Object.entries(tests).forEach(([name, fn]) => suite.add(name, fn));

	suite.on("start", function () {
		console.info(`Starting "${this.name}" perf suite:`);
	});

	suite.on("cycle", function (event) {
		console.info(`>>> ${String(event.target)}`);
	});

	suite.on("complete", function () {
		const fastest = this.filter("fastest").map("name").join(", ");

		console.info(`Done, the fastest is "${fastest}".`);
	});

	suite.run({ async: false });
}
