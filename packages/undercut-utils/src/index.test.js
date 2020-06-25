import { describe, expect, test } from "@jest/globals";

import * as exports from "./index.js";

describe(`Utils`, () => {
	test(`exports of the main "utils" entry should be stable`, () => {
		expect(Object.keys(exports).sort()).toMatchSnapshot();
	});
});
