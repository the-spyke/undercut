import { assert } from "../utils/assertions.js";

export function* range(start, end, step = 1) {
	assert(Number.isFinite(start), "Start is required and must be a number.");
	assert(Number.isFinite(end), "End is required and must be a number.");
	assert(Number.isFinite(step) && step > 0, "Step is required and must be an absolute non-zero number.");

	if (start < end) {
		for (let i = start; i < end; i += step) {
			yield i;
		}
	} else if (start > end) {
		for (let i = start; i > end; i -= step) {
			yield i;
		}
	}
}
