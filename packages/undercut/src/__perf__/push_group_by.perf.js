import { assertFunctor } from "../utils/assert.js";
import { runPerfSuite } from "../utils/perf.js";

import { composeOperations, pushItems } from "../push/push_core.js";
import { groupBy as groupBy1 } from "../push/operations/group_by.js";
import { flattenIterables } from "../push/operations/flatten.js";
import { reduce } from "../push/operations/reduce.js";

function groupBy2(keySelector) {
	assertFunctor(keySelector, `keySelector`);

	return composeOperations([
		reduce((groups, item, index) => {
			const key = keySelector(item, index);

			let groupItems = groups.get(key);

			if (!groupItems) {
				groupItems = [];
				groups.set(key, groupItems);
			}

			groupItems.push(item);

			return groups;
		}, new Map()),
		flattenIterables(),
	]);
}

function fillData(n) {
	const data = Array(n);

	for (let index = 0; index < n; index++) {
		data[index] = {
			id: Math.trunc(Math.random() * 50)
		};
	}

	return data;
}

const data = fillData(1000);

runPerfSuite(`push-group-by_imperative-vs-composed`, {
	"groupBy1": () => {
		pushItems([
			groupBy1(i => i.id),
		], data);
	},
	"groupBy2": () => {
		pushItems([
			groupBy2(i => i.id),
		], data);
	},
});
