"use strict";

const { readFile, writeFile } = require(`fs`).promises;

const { diffStringsUnified } = require(`jest-diff`);
const yargs = require(`yargs`);

module.exports = async function modifyJsonFile(action) {
	const [source, target = source] = yargs.argv._;

	console.log(`----> Applying JSON modification to '${source}'`); // eslint-disable-line no-console

	const sourceText = await readFile(source, `utf8`);
	const json = JSON.parse(sourceText);

	const result = action(json) ?? json;

	const targetText = JSON.stringify(result, null, 2) + `\n`;

	console.log(diffStringsUnified(sourceText, targetText, { expand: false })); // eslint-disable-line no-console

	await writeFile(target, targetText, `utf8`);

	console.log(`----> Sucessfully applied ${source === target ? `inplace` : `at '${target}'`}`); // eslint-disable-line no-console
};
