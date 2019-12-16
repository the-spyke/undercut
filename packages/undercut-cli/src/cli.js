#!/usr/bin/env node

import "core-js/es/index.js";

import yargs from "yargs";

import { runPush } from "./index.js";

const argv = yargs
	.scriptName(`undercut`)
	.usage(
		`$0 [...options] [...operations]\n\n` +
		`Specify operations using JavaScript expressions as quoted strings separated by spaces:\n` +
		`$0 'op_1()' 'op_2()' 'op_N()'\n` +
		`Quotes are required, so the shell won't try to parse the expression.\n` +
		`The code inside operation's parentheses could be any valid JS expression: 'map(Math.round)'\n` +
		`Undercut utilities are available as the "utils" variable in the global scope: 'sortStrings(utils.asc)`
	)
	.strict()
	.example(
		`cat strings.txt | $0 'map(l => l.trim())' 'filter(l => l.length > 10)' > output.txt`,
		`Pipe in a text file line-by-line, trim each line, filter lines longer than 10 symbols, save into "output.txt".`
	)
	.example(``)
	.example(
		`$0 --source 'range(0, 10)' 'sum()'`,
		`Generate a range of numbers and calculate their sum. The result will be outputed as a string.`
	)
	.option(`source`, {
		alias: `s`,
		default: undefined,
		describe: `A JS exression for a pull source that will be used to generate input lines instead of piping "stdin"`,
		nargs: 1,
		requiresArg: true,
		type: `string`,
	})
	.help()
	.alias(`help`, `h`)
	.showHelpOnFail(false, `Specify --help for available options`)
	.version()
	.alias(`version`, `v`)
	.epilogue(`For more information, visit https://github.com/the-spyke/undercut`)
	.wrap(yargs.terminalWidth())
	.argv;

runPush(argv.source, argv._);
