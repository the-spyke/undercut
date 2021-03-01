import { expect, test } from "@jest/globals";

import { simulatePull } from "./index";

test(`simulatePull`, () => {
	expect(simulatePull((i: any) => i, [1, 3])).toEqual([1, 3]);
});
