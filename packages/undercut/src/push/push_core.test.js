import { initializeObserver } from "../utils/observer.js";

import { createPushLine } from "./push_core.js";
import { toArray } from "./push_target.js";

import { filter } from "./operations/filter.js";

test("pushline", () => {
	const result = [];
	const target = initializeObserver(toArray(result));
	const pipeline = [
		filter(x => x % 2 === 0),
		filter(x => x !== 4)
	];
	const pushline = createPushLine(pipeline, target);

	for (let i = 0; i < 7; i++) {
		pushline.next(i);
	}

	expect(result).toEqual([0, 2, 6]);
});
