import { testOperationPull, testOperationPush } from "@undercut/testing";

import { chunk as chunkPull } from "@undercut/pull/src/operations/chunk.js";
import { chunk as chunkPush } from "@undercut/push/src/operations/chunk.js";

function testChunk(testOperation, chunk) {
	expect(() => chunk()).toThrow();
	expect(() => chunk(-4)).toThrow();
	expect(() => chunk(0)).toThrow();
	expect(() => chunk(0.5)).toThrow();

	testOperation(chunk, {
		args: [2],
		source: [],
		target: []
	});
	testOperation(chunk, {
		args: [1],
		source: [1],
		target: [[1]]
	});
	testOperation(chunk, {
		args: [2],
		source: [1],
		target: [[1]]
	});
	testOperation(chunk, {
		args: [2],
		source: [1, 2],
		target: [[1, 2]]
	});
	testOperation(chunk, {
		args: [1.5],
		source: [1, 2],
		target: [[1], [2]]
	});
	testOperation(chunk, {
		args: [2],
		source: [1, 2, 3, 4],
		target: [[1, 2], [3, 4]]
	});
	testOperation(chunk, {
		args: [3],
		source: [1, 2, 3, 4],
		target: [[1, 2, 3], [4]]
	});
}

describe(`chunk`, () => {
	test(`pull`, () => testChunk(testOperationPull, chunkPull));
	test(`push`, () => testChunk(testOperationPush, chunkPush));
});
