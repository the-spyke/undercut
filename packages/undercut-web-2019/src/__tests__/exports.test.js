import { describe, expect, test } from "@jest/globals";

import * as pullExports from "@undercut/pull";
import * as pushExports from "@undercut/push";
import * as utilsExports from "@undercut/utils";

import * as myPullExports from "../../pull.js";
import * as myPushExports from "../../push.js";
import * as myUtilsExports from "../../utils.js";

describe(`Exports of @undercut/web-2019`, () => {
	test(`/pull should match @undercut/pull`, () => {
		expect(Object.keys(myPullExports).sort()).toEqual(Object.keys(pullExports).sort());
	});

	test(`/push should match @undercut/push`, () => {
		expect(Object.keys(myPushExports).sort()).toEqual(Object.keys(pushExports).sort());
	});

	test(`/utils should match @undercut/utils`, () => {
		expect(Object.keys(myUtilsExports).sort()).toEqual(Object.keys(utilsExports).sort());
	});
});
