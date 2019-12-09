import * as pullExports from "@undercut/pull";
import * as pushExports from "@undercut/push";
import * as utilsExports from "@undercut/utils";

describe(`exports`, () => {
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
