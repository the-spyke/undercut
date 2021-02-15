import { describe, expect, test } from "@jest/globals";

import * as mainExports from "./index";

describe(`Collections`, () => {
	test(`exports of the main entry should be stable`, () => {
		expect(Object.keys(mainExports).sort()).toMatchSnapshot();
	});
});
