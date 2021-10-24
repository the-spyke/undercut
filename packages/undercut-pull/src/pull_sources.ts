import { assert } from "@undercut/utils/assert";
import { createIterable } from "@undercut/utils";

function* rangeGen(start: number, end: number, step: number): Iterator<number> {
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

/**
 * Creates an iterable of numbers in range `[start, end)` with an optional step.
 */
export function range(start: number, end: number, step = 1): Iterable<number> {
	assert(Number.isFinite(start), `"start" is required, must be a number.`);
	assert(Number.isFinite(end), `"end" is required, must be a number.`);
	assert(Number.isFinite(step) && step > 0, `"step" must be an absolute non-zero number.`);

	return createIterable(() => rangeGen(start, end, step));
}
