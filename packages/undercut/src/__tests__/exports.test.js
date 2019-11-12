import * as indexExports from "./../../index.js";
import * as pullExports from "./../../pull.js";
import * as pushExports from "./../../push.js";
import * as utilsExports from "./../../utils.js";

describe(`exports`, () => {
	test(`index`, () => {
		expect(Object.keys(indexExports).sort()).toMatchSnapshot();
	});

	test(`pull`, () => {
		expect(Object.keys(pullExports).sort()).toMatchSnapshot();
	});

	test(`push`, () => {
		expect(Object.keys(pushExports).sort()).toMatchSnapshot();
	});

	test(`utils`, () => {
		expect(Object.keys(utilsExports).sort()).toMatchSnapshot();
	});
});
