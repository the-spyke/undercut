/* eslint-env node */

import { readFile, writeFile } from "fs";
import { promisify } from "util";

import { diffStringsUnified } from "jest-diff";
import yargsFactory from "yargs";
import { hideBin } from "yargs/helpers"; // eslint-disable-line import/extensions

export async function modifyJsonFile(action) {
	const yargs = yargsFactory(hideBin(process.argv));
	const [source, target = source] = yargs.argv._;

	console.log(`Applying JSON modification from '${source}' to '${target}'`); // eslint-disable-line no-console

	const sourceText = await promisify(readFile)(source, `utf8`);
	const obj = JSON.parse(sourceText);

	const result = action(obj) || obj;

	const targetText = JSON.stringify(result, null, 2) + `\n`;

	console.log(diffStringsUnified(sourceText, targetText, { expand: false })); // eslint-disable-line no-console

	await promisify(writeFile)(target, targetText, `utf8`);
}
