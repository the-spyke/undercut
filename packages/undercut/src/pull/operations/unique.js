import { assertFunctor } from "../../utils/assertions.js";
import { identity } from "../../utils/function.js";

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
	assertFunctor(selector, "selector");

	return unionBy(selector);
}
