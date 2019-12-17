"use strict";

const { readFile, writeFile } = require(`fs`).promises;
const yargs = require(`yargs`);

module.exports = async function modifyJsonFile(action) {
	const [source, target] = yargs.argv._;
	const sourceText = await readFile(source, `utf8`);
	const json = JSON.parse(sourceText);

	action(json);

	const targetText = JSON.stringify(json, null, 2);

	return writeFile(target, targetText, `utf8`);
};
