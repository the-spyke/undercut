import {
	composeOperations, pushArray,
	groupBy as groupBy1,
	flattenIterables,
	reduce
} from "@undercut/push";
import { assertFunctor } from "@undercut/utils/src/assert.js";

import { runPerfSuite } from "../perf.js";

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
		pushArray([
			groupBy1(i => i.id),
		], data);
	},
	"groupBy2": () => {
		pushArray([
			groupBy2(i => i.id),
		], data);
	},
});
