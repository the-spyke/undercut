'use strict';

module.exports = function getParserOpts(config) {
	return {
		headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
		breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
		headerCorrespondence: [
			`type`,
			`scope`,
			`subject`
		],
		noteKeywords: [`BREAKING CHANGE`],
		revertPattern: /^(?:revert:)\s"?([\s\S]+?)"?\s*this reverts commit (\w*)\./i,
		revertCorrespondence: [`header`, `hash`],
		issuePrefixes: config.issuePrefixes || [`#`],
	};
};
