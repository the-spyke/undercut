import { expect, test } from "@jest/globals";

import { parseImport } from "./index.js";

test(`parseImports`, () => {
	expect(() => parseImport()).toThrow();
	expect(() => parseImport(123)).toThrow();
	expect(() => parseImport(``)).toThrow();
	expect(() => parseImport(`a::b::c`)).toThrow();
	expect(() => parseImport(`::b`)).toThrow();
	expect(() => parseImport(`a::`)).toThrow();
	expect(() => parseImport(`./asd.js`)).toThrow();
	expect(() => parseImport(`/asd.js`)).toThrow();
	expect(() => parseImport(`@babel/cli`)).toThrow();

	expect(parseImport(`c::chalk`)).toEqual([`c`, `chalk`]);
	expect(parseImport(`c::@chalk/cli`)).toEqual([`c`, `@chalk/cli`]);
	expect(parseImport(`w::./asd.js`)).toEqual([`w`, `./asd.js`]);
	expect(parseImport(`w::/asd.js`)).toEqual([`w`, `/asd.js`]);
	expect(parseImport(`chalk`)).toEqual([`chalk`, `chalk`]);
	expect(parseImport(`{ green, blue }::chalk`)).toEqual([`{ green, blue }`, `chalk`]);
});
