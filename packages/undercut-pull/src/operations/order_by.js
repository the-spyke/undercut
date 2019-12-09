import { assert } from "@undercut/utils/src/assert.js";
import { orderingFactory } from "@undercut/utils/src/ordering.js";

import { sort } from "./sort.js";

export function orderBy(...orderingSpecs) {
	assert(orderingSpecs.length > 0, `You must specify at least 1 ordering spec with "asc()" or "desc()"`);

	return sort(orderingFactory(orderingSpecs));
}
