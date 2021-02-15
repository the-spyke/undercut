import { assert } from "@undercut/utils/assert";
import { createIterable } from "@undercut/utils";

function* rangeGen(start, end, step) {
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
 * Creates an iterable of numbers in range `[start, end)` with optional step.
 * @param {Number} start
 * @param {Number} end
 * @param {Number} [step=1]
 * @returns {Iterable<Number>}
 */
export function range(start, end, step = 1) {
	assert(Number.isFinite(start), `"start" is required, must be a number.`);
	assert(Number.isFinite(end), `"end" is required, must be a number.`);
	assert(Number.isFinite(step) && step > 0, `"step" must be an absolute non-zero number.`);

	return createIterable(() => rangeGen(start, end, step));
}
