import { describe, expect, test } from "@jest/globals";

import * as mainExports from "./index";

describe(`Utils`, () => {
	test(`exports of the main "utils" entry should be stable`, () => {
		expect(Object.keys(mainExports).sort()).toMatchSnapshot();
	});
});
