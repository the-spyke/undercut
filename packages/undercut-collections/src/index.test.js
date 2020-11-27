import { describe, expect, test } from "@jest/globals";

import * as exports from "./index.js";

describe(`Collections`, () => {
	test(`exports of the main entry should be stable`, () => {
		expect(Object.keys(exports).sort()).toMatchSnapshot();
	});
});
