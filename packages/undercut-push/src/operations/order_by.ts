import type { Comparator, PushOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { composeComparators } from "@undercut/utils";

import { sort } from "./sort";

export function orderBy<T>(...comparators: Comparator<T>[]): PushOperation<T> {
	assert(comparators.length > 0, `You must specify at least 1 order by "asc" or "desc" function calls.`);

	return sort(composeComparators(comparators));
}
