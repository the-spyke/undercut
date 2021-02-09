import { expect, test } from "@jest/globals";

import semver from "semver";

test(`Node.js version should be at least 12.17`, () => {
	expect(semver.satisfies(process.version, `>=12.17`)).toBe(true);
});
