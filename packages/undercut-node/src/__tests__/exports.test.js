import { describe, expect, test } from "@jest/globals";

import * as pullExports from "@undercut/pull";
import * as pushExports from "@undercut/push";
import * as utilsExports from "@undercut/utils";

import * as myPullExports from "../../exports/pull.js";
import * as myPushExports from "../../exports/push.js";
import * as myUtilsExports from "../../exports/utils.js";

import * as myOwnExports from "../index.js";

describe(`Exports of @undercut/node`, () => {
	test(`should be stable`, () => {
		expect(Object.keys(myOwnExports).sort()).toMatchSnapshot();
	});

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
