import { expect, test } from "@jest/globals";

test(`Tests should run in a browser`, () => {
	expect(typeof navigator).toBeDefined();
});
