#!/usr/bin/env node

import "./polyfills.js";

import { EOL } from "os";

import yargsFactory from "yargs";
import { hideBin } from "yargs/helpers";

import { run } from "./index.js";

const GROUP_OPTIONS = `Options:`;
const GROUP_OTHER = `Other:`;

const yargs = yargsFactory(hideBin(process.argv));

const argv = yargs
	.scriptName(`undercut`)
	.usage(
		EOL +
		`$0 [...options] [...operations]` + EOL + EOL +
		`"@undercut/cli" is designed around Push Lines.` + EOL +
		`Specify operations as quoted strings separated by spaces: 'map(x => x + 1)' 'filter(x => x > 2)' ...` + EOL +
		`Quotes are required to stop the shell from parsing the expressions.` + EOL +
		`Besides usual Node.js globals all "@undercut/push" exports are loaded by default.` + EOL +
		`Push exports are also available as a namespace by the global name "push".` + EOL +
		`You may quickly import "@undercut/pull" and "@undercut/utils" by using -p and -u keys.` + EOL +
		`An operation could be any valid JS expression resulting into a PushOperation: 'observer => observer'.`
	)
	.strict()
	.example(
		`$ cat strings.txt | $0 'map(l => l.trim())' 'filter(l => l.length > 10)' > output.txt`,
		`Pipe in a text file line-by-line, trim each line, filter lines longer than 10 symbols, save into "output.txt".`
	)
	.example(
		`$ $0 -p -s 'pull.range(1, 9)' 'sum()'`,
		`Generate a range of numbers and calculate their sum. The result will be outputed as a string.`
	)
	.example(
		`$ cat file.txt | $0 -i 'chalk' 'map(s => chalk.green(s))'`,
		`Import the 'chalk' npm package (should be installed) and make lines green.`
	)
	.option(`debug`, {
		describe: `Output parsed arguments to help with debugging errors.`,
		default: false,
		requiresArg: false,
		type: `boolean`,
	})
	.option(`i`, {
		alias: [`import`],
		group: GROUP_OPTIONS,
		describe: `Import a Node.js module in the following format "name::id".`,
		nargs: 1,
		requiresArg: true,
		type: `string`,
	})
	.option(`p`, {
		alias: [`pull`],
		group: GROUP_OPTIONS,
		default: false,
		describe: `A shortcut for importing "@undercut/pull" under the name "pull".`,
		requiresArg: false,
		type: `boolean`,
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
	.option(`u`, {
		alias: [`utils`],
		group: GROUP_OPTIONS,
		default: false,
		describe: `A shortcut for importing "@undercut/utils" under the name "utils".`,
		requiresArg: false,
		type: `boolean`,
	})
	.check(args => {
		return Array.isArray(args.source) ? `You can specify "--source" only once.` : true;
	})
	.help()
	.group(`help`, GROUP_OTHER)
	.showHelpOnFail(false, `Specify --help for available options.`)
	.version()
	.group(`version`, GROUP_OTHER)
	.epilogue(`For more information, please visit https://undercut.js.org/`)
	.wrap(yargs.terminalWidth())
	.argv;

if (!argv.import) argv.import = [];
if (typeof argv.import === `string`) argv.import = [argv.import];

if (argv.pull) argv.import.push(`pull::@undercut/node/pull`);
if (argv.utils) argv.import.push(`utils::@undercut/node/utils`);

if (argv.debug) {
	console.log(argv); // eslint-disable-line no-console
}

run(argv._, {
	imports: argv.import,
	source: argv.source,
});
