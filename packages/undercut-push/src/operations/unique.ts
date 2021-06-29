import type { PushOperation, Selector } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { identity } from "@undercut/utils";

import { unionBy } from "./union";

/**
 * Multisets are not supported.
 */
export function unique<T>(): PushOperation<T> {
	return unionBy(identity);
}

/**
 * Multisets are not supported.
 */
export function uniqueBy<T, K>(selector: Selector<T, K>): PushOperation<T> {
	assertFunctor(selector, `selector`);

	return unionBy(selector);
}
