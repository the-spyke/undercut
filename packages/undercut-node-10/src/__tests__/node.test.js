import { satisfies } from "semver";

test(`Node.js is version 10.x`, () => {
	expect(satisfies(process.version, `^10.x`)).toBe(true);
});
