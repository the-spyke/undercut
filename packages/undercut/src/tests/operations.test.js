import * as pullOperations from "../pull/pull_operations.js";
import * as pushOperations from "../push/push_operations.js";

describe("operations", () => {
	const operationsList = [
		"append",
		"average",
		"chunk",
		"compact",
		"concatStart",
		"concatEnd",
		"count",
		"differenceBy",
		"symmetricDifferenceBy",
		"difference",
		"symmetricDifference",
		"every",
		"filter",
		"find",
		"findIndex",
		"first",
		"flatten",
		"flattenIterables",
		"forEach",
		"groupBy",
		"includes",
		"interleave",
		"intersectionBy",
		"intersection",
		"join",
		"last",
		"map",
		"max",
		"min",
		"nth",
		"orderBy",
		"prepend",
		"reduce",
		"remove",
		"reverse",
		"skip",
		"skipWhile",
		"some",
		"sort",
		"sortNumbers",
		"sortStrings",
		"sum",
		"take",
		"takeWhile",
		"unionBy",
		"union",
		"unique",
		"uniqueBy",
		"unzip",
		"unzipWith",
		"zip",
		"zipWith",
	];

	test("pull", () => {
		expect(Object.keys(pullOperations)).toEqual(operationsList);
	});

	test("push", () => {
		expect(Object.keys(pushOperations)).toEqual(operationsList);
	});
});
