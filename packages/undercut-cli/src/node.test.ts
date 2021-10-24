import { expect, test } from "@jest/globals";
import { satisfies } from "semver";

import { NODE_LTS_VERSION } from "@undercut/config";

test(`Node.js version should be at least ${NODE_LTS_VERSION}`, () => {
	expect(satisfies(process.version, `>=${NODE_LTS_VERSION}`)).toBe(true);
});
