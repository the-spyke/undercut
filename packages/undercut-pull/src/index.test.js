import { describe, expect, test } from "@jest/globals";

import * as exports from "./index.js";

describe(`Exports`, () => {
	test(`of the main entry should be stable`, () => {
		expect(Object.keys(exports).sort()).toMatchSnapshot();
	});
});
