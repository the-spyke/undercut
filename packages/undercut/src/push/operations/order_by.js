import { assert } from "../../utils/assert.js";
import { orderingFactory } from "../../utils/sorting.js";

import { sort } from "./sort.js";

export function orderBy(...orderingSpecs) {
	assert(orderingSpecs.length > 0, `You must specify at least 1 ordering spec with "asc()" or "desc()"`);

	return sort(orderingFactory(orderingSpecs));
}
