import { EOL } from "os";

import { describe, expect, test } from "@jest/globals";
import shell from "shelljs";

describe(`Undercut command in a shell`, () => {
	const echo = text => shell.exec(`echo ${text}`, { silent: true });
	const undercut = (command, pipe = shell) => {
		const result = pipe.exec(`./src/cli.js ${command}`, { silent: true });

		if (result.code !== 0) {
			throw new Error(result.stderr);
		}

		return result.stdout.trim();
	};

	test(`should work with push operations`, async () => {
		expect(undercut(`'map(s => s + "-test")'`, echo(`asd`))).toEqual(`asd-test`);
		expect(undercut(`'map(x => x + 1)'`, echo(`1`))).toEqual(`11`);
		expect(undercut(`'map(s => parseInt(s, 10))' 'map(x => x + 1)'`, echo(`1`))).toEqual(`2`);
	});

	test(`should support --import option`, async () => {
		expect(undercut(`-s '["asd.txt"]' -i path 'map(f => path.extname(f))'`)).toEqual(`.txt`);
		expect(undercut(`-s '["asd.txt"]' -i "p::path" 'map(f => p.extname(f))'`)).toEqual(`.txt`);
		expect(undercut(`-s '["asd.txt"]' -i "{extname}::path" 'map(f => extname(f))'`)).toEqual(`.txt`);
		expect(undercut(`-s '["asd.txt"]' -i "{extname:ext}::path" 'map(f => ext(f))'`)).toEqual(`.txt`);
		expect(undercut(`-s '["path"]' -i "{parseImport}::./src/index.js" 'map(i => parseImport(i))'`)).toEqual(`path,path`);
		expect(undercut(`-s '["asd.txt"]' -i path 'map(f => path.extname(f))' --import os`)).toEqual(`.txt`);
	});

	test(`should support --help option`, async () => {
		const help = undercut(`--help`);

		expect(help).toContain(`undercut [...options] [...operations]`);
		expect(help).toContain(`For more information, please visit`);
	});

	test(`should support --pull option`, async () => {
		expect(() => undercut(`-s 'pull.range(0, 3)'`)).toThrow(`pull is not defined`);
		expect(undercut(`-p -s 'pull.range(0, 3)'`)).toEqual(`0${EOL}1${EOL}2`);
		expect(undercut(`-p -s 'pull.range(0, 3)'`)).toEqual(undercut(`--pull -s 'pull.range(0, 3)'`));
	});

	test(`should support --source option`, async () => {
		expect(undercut(`-s '[2,3]' 'map(x => x * 2)'`)).toEqual(`4${EOL}6`);
		expect(undercut(`-s '""asd""' 'map(c => c.toUpperCase())'`)).toEqual(`A${EOL}S${EOL}D`);
	});

	test(`should support --utils option`, async () => {
		expect(() => undercut(`'map(utils.isString)'`, echo(`asd`))).toThrow(`utils is not defined`);
		expect(undercut(`-u 'map(utils.isString)'`, echo(`asd`))).toEqual(`true`);
		expect(undercut(`-u 'map(utils.isString)'`, echo(`asd`))).toEqual(undercut(`--utils 'map(utils.isString)'`, echo(`asd`)));
	});

	test(`should support --version option`, async () => {
		expect(undercut(`--version`)).toMatch(/^\d+\.\d+\.\d+$/);
	});
});
