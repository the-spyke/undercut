import type { PullOperation, Selector } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { identity } from "@undercut/utils";

import { unionBy } from "./union";

/**
 * Multisets are not supported.
 */
export function unique<T>(): PullOperation<T> {
	return unionBy(identity);
}

/**
 * Multisets are not supported.
 */
export function uniqueBy<T, K>(selector: Selector<T, K>): PullOperation<T> {
	assertFunctor(selector, `selector`);

	return unionBy(selector);
}
