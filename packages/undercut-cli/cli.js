#!/usr/bin/env node

// Polyfills first
import "core-js/es/index.js";

import yargs from "yargs";

import { runPush } from "./index.js";

const argv = yargs
	.scriptName(`undercut`)
	.usage(`$0 [options] [operations]`)
	.option(`sourse`, {
		alias: `s`,
		demandOption: false,
		default: undefined,
		describe: `A pull source that will be used to generate input lines instead of piping "stdin"`,
		type: `string`
	})
	.help()
	.argv;

runPush(argv.sourse, argv._);
