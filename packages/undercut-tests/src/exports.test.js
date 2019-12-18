import * as pullExports from "@undercut/pull";
import * as pushExports from "@undercut/push";
import * as utilsExports from "@undercut/utils";

describe(`Exports of`, () => {
	test(`@undercut/pull should be stable`, () => {
		expect(Object.keys(pullExports).sort()).toMatchSnapshot();
	});

	test(`@undercut/push should be stable`, () => {
		expect(Object.keys(pushExports).sort()).toMatchSnapshot();
	});

	test(`@undercut/utils should be stable`, () => {
		expect(Object.keys(utilsExports).sort()).toMatchSnapshot();
	});
});
