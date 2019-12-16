import { getPipelineString } from "./index.js";

test(`getPipelineString`, () => {
	expect(getPipelineString()).toEqual(`[]`);
	expect(getPipelineString([])).toEqual(`[]`);
	expect(getPipelineString([`map(x => x + 2)`])).toEqual(`[push.map(x => x + 2)]`);
	expect(getPipelineString([`  map(x => x + 2) `])).toEqual(`[push.map(x => x + 2)]`);
	expect(getPipelineString([`map(x => x + 2)`, `sum()`])).toEqual(`[push.map(x => x + 2),push.sum()]`);
});
