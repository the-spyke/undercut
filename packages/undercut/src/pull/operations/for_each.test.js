import { targetOf } from "../../utils/tests.js";

import { forEach } from "./for_each.js";

test("forEach", () => {
	expect(() => forEach()).toThrow();

	const callback = jest.fn();

	targetOf(forEach(callback), []);

	expect(callback.mock.calls.length).toBe(0);
	
	targetOf(forEach(callback), [undefined, false, 7]);
	
	expect(callback.mock.calls.length).toBe(3);
	expect(callback.mock.calls[0][0]).toBe(undefined);
	expect(callback.mock.calls[1][0]).toBe(false);
	expect(callback.mock.calls[2][0]).toBe(7);
});
