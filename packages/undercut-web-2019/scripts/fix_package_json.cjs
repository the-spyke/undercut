"use strict";

const modifyJsonFile = require(`@undercut/config/modify_json_file.cjs`);

modifyJsonFile(json => {
	json.type = `commonjs`;
	delete json.exports;
});
