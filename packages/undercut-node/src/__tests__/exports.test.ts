import { describe, expect, test } from "@jest/globals";

describe(`Exports of @undercut/node`, () => {
	test(`should be stable`, async () => {
		const myOwnExports = await import(`../index`);

		expect(Object.keys(myOwnExports).sort()).toMatchSnapshot();
	});

	test(`/pull should match @undercut/pull`, async () => {
		const pullExports = await import(`@undercut/pull`);
		const myPullExports = await import(`../../pull`);

		expect(Object.keys(myPullExports).sort()).toEqual(Object.keys(pullExports).sort());
	});

	test(`/push should match @undercut/push`, async () => {
		const pushExports = await import(`@undercut/push`);
		const myPushExports = await import(`../../push`);

		expect(Object.keys(myPushExports).sort()).toEqual(Object.keys(pushExports).sort());
	});

	test(`/utils should match @undercut/utils`, async () => {
		const utilsExports = await import(`@undercut/utils`);
		const myUtilsExports = await import(`../../utils`);

		expect(Object.keys(myUtilsExports).sort()).toEqual(Object.keys(utilsExports).sort());

		const arrayExports = await import(`@undercut/utils/array`);
		const myArrayExports = await import(`../../utils/array`);

		expect(Object.keys(myArrayExports).sort()).toEqual(Object.keys(arrayExports).sort());

		const assertExports = await import(`@undercut/utils/assert`);
		const myAssertExports = await import(`../../utils/assert`);

		expect(Object.keys(myAssertExports).sort()).toEqual(Object.keys(assertExports).sort());
	});
});
