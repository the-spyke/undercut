'use strict';

const getParserOpts = require(`./get_parser_opts.js`);
const getWriterOpts = require(`./get_writer_opts.js`);
const getRecommendedBumpOpts = require(`./get_recommended_bump_opts.js`);

module.exports = async function getUndercutPreset(config = {}) {
	const parserOpts = getParserOpts(config);
	const recommendedBumpOpts = getRecommendedBumpOpts(config);
	const writerOpts = await getWriterOpts(config);

	return {
		conventionalChangelog: { parserOpts, writerOpts },
		parserOpts,
		recommendedBumpOpts,
		writerOpts,
	};
};
