import { assertFunctor } from "@undercut/utils/src/assert.js";
import { identity } from "@undercut/utils/src/function.js";

import { unionBy } from "./union.js";

/**
 * Multisets are not supported.
 */
export function unique() {
	return unionBy(identity);
}

/**
 * Multisets are not supported.
 */
export function uniqueBy(selector) {
	assertFunctor(selector, `selector`);

	return unionBy(selector);
}
