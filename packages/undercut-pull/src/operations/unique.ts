import { assertFunctor } from "@undercut/utils/assert";
import { identity } from "@undercut/utils";

import { unionBy } from "./union";

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
