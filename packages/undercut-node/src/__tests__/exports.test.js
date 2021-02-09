import { describe, expect, test } from "@jest/globals";

describe(`Exports of @undercut/node`, () => {
	test(`should be stable`, async () => {
		const myOwnExports = await import(`../index.js`);

		expect(Object.keys(myOwnExports).sort()).toMatchSnapshot();
	});

	test(`/pull should match @undercut/pull`, async () => {
		const pullExports = await import(`@undercut/pull`);
		const myPullExports = await import(`../../exports/pull.js`);

		expect(Object.keys(myPullExports).sort()).toEqual(Object.keys(pullExports).sort());
	});

	test(`/push should match @undercut/push`, async () => {
		const pushExports = await import(`@undercut/push`);
		const myPushExports = await import(`../../exports/push.js`);

		expect(Object.keys(myPushExports).sort()).toEqual(Object.keys(pushExports).sort());
	});

	test(`/utils should match @undercut/utils`, async () => {
		const utilsExports = await import(`@undercut/utils`);
		const myUtilsExports = await import(`../../exports/utils.js`);

		expect(Object.keys(myUtilsExports).sort()).toEqual(Object.keys(utilsExports).sort());
	});
});
