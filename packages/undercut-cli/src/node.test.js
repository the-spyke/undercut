import { expect, test } from "@jest/globals";
import { satisfies } from "semver";

test(`Node.js version should be at least 10.13`, () => {
	expect(satisfies(process.version, `^10.13`)).toBe(true);
});
