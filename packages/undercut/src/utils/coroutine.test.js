import { delay } from "./promise.js";

import { Coruntime } from "./coroutine.js";

function* genAsync(a, b) {
	const result = [];

	while (a < b) {
		const x = yield delay().then(() => a);
		result.push(x);
		a++;
	}

	return result;
}

function* genSync(a, b) {
	const result = [];

	while (a < b) {
		yield;
		result.push(a);
		a++;
	}

	return result;
}

test.skip("coruntime", () => {
	console.log(`start`);

	const runtime = new Coruntime();

	const awaiter = Promise.all([
		runtime.add(genSync(3, 7)),
		runtime.add(genAsync(0, 1)),
		runtime.add(genSync(7, 19)),
		runtime.add(genAsync(1, 4)),
	]).then(r => {
		console.log(`end`);
		// console.log(r);
		// console.log(runtime.states.values());
		expect(r).toEqual([
			[3, 4, 5, 6],
			[0],
			[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
			[1, 2, 3]
		]);
	});

	runtime.run();

	return awaiter;
});
