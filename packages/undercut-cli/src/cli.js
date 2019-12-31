#!/usr/bin/env node

import "./polyfills.js";

import { EOL } from "os";

import yargs from "yargs";

import { run } from "./index.js";

const GROUP_OPTIONS = `Options:`;
const GROUP_OTHER = `Other:`;

const argv = yargs
	.scriptName(`undercut`)
	.usage(
		EOL +
		`$0 [...options] [...operations]` + EOL + EOL +
		`"@undercut/cli" is designed around Push Lines.` + EOL +
		`Specify operations as quoted strings separated by spaces: 'op1' 'op2' 'opN'.` + EOL +
		`Quotes are required to stop the shell from parsing the expressions.` + EOL +
		`Besides usual Node.js globals 3 "undercut" packages are available under their names: pull, push, utils.` + EOL +
		`You may omit 'push.' on the top level for operations: 'sortStrings(push.asc)' vs. 'push.sortStrings(push.asc)'.` + EOL +
		`An operation could be any valid JS expression resulting into a PushOperation: 'observer => observer'.`
	)
	.strict()
	.example(
		`$ cat strings.txt | $0 'map(l => l.trim())' 'filter(l => l.length > 10)' > output.txt`,
		`Pipe in a text file line-by-line, trim each line, filter lines longer than 10 symbols, save into "output.txt".`
	)
	.example(
		`$ $0 -s 'range(1, 9)' 'sum()'`,
		`Generate a range of numbers and calculate their sum. The result will be outputed as a string.`
	)
	.example(
		`$ $0 -i 'c::chalk' -s 'range(1, 9)' 'map(x => c.green(x))'`,
		`Import the 'chalk' npm package (should be installed) and make output numbers green.`
	)
	.option(`i`, {
		alias: [`import`],
		group: GROUP_OPTIONS,
		describe: `Import a Node.js module in the following format "name::id".`,
		requiresArg: true,
		type: `array`,
	})
	.option(`s`, {
		alias: `source`,
		group: GROUP_OPTIONS,
		default: undefined,
		describe: `Use an exression of an Iterable to drive the input instead of "stdin": '[1, 2, 3, 4]'.`,
		nargs: 1,
		requiresArg: true,
		type: `string`,
	})
	.help()
	.group(`help`, GROUP_OTHER)
	.showHelpOnFail(false, `Specify --help for available options.`)
	.version()
	.group(`version`, GROUP_OTHER)
	.epilogue(`For more information, please visit https://github.com/the-spyke/undercut`)
	.wrap(yargs.terminalWidth())
	.argv;

run(argv.import, argv.source, argv._);
