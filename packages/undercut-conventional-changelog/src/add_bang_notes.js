'use strict';

const getParserOpts = require(`./get_parser_opts.js`);

module.exports = function addBandNotes(commit) {
	if (commit.notes.length) return;

	const { breakingHeaderPattern } = getParserOpts({});
	const match = commit.header.match(breakingHeaderPattern);

	if (match) {
		const noteText = match[3]; // the description of the change.

		commit.notes.push({
			text: noteText
		});
	}
};
