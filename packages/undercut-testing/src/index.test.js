import { expect, test } from "@jest/globals";

import { simulatePull } from "./index.js";

test(`simulatePull`, () => {
	expect(simulatePull(i => i, [1, 3])).toEqual([1, 3]);
});
