import { targetOf, expectCallbackArgsToBe } from "../../utils/tests.js";

import { forEach } from "./for_each.js";

test("forEach", () => {
	expect(() => forEach()).toThrow();

	expectCallbackArgsToBe(
		() => true,
		cb => targetOf(forEach(cb), []),
	);

	expectCallbackArgsToBe(
		() => true,
		cb => targetOf(forEach(cb), [undefined, false, 7]),
		[undefined, 0], [false, 1], [7, 2]
	);
});
