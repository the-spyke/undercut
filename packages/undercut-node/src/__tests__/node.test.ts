import { expect, test } from "@jest/globals";
// @ts-expect-error
import semver from "semver";

// @ts-expect-error
import { NODE_LTS_VERSION } from "@undercut/config";

test(`Node.js version should be at least ${NODE_LTS_VERSION}`, () => {
	expect(semver.satisfies(process.version, `>=${NODE_LTS_VERSION}`)).toBe(true);
});
