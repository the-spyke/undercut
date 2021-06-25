import { assert } from "@undercut/utils/src/assert.js";
import { composeComparators } from "@undercut/utils/src/ordering.js";

import { sort } from "./sort.js";

export function orderBy(...comparators) {
	assert(comparators.length > 0, `You must specify at least 1 order by "asc" or "desc" function calls.`);

	return sort(composeComparators(comparators));
}
