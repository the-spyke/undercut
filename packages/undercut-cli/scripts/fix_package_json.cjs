"use strict";

const modifyJsonFile = require(`@undercut/config/modify_json_file.cjs`);

modifyJsonFile(json => {
	json.main = `lib/index.js`;
	json.bin.undercut = `lib/cli.js`;
});
