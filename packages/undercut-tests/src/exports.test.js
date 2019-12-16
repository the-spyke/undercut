import * as pullExports from "@undercut/pull";
import * as pushExports from "@undercut/push";
import * as testingExports from "@undercut/testing";
import * as utilsExports from "@undercut/utils";

describe(`exports`, () => {
	test(`@undercut/pull`, () => {
		expect(Object.keys(pullExports).sort()).toMatchSnapshot();
	});

	test(`@undercut/push`, () => {
		expect(Object.keys(pushExports).sort()).toMatchSnapshot();
	});

	test(`@undercut/testing`, () => {
		expect(Object.keys(testingExports).sort()).toMatchSnapshot();
	});

	test(`@undercut/utils`, () => {
		expect(Object.keys(utilsExports).sort()).toMatchSnapshot();
	});
});
