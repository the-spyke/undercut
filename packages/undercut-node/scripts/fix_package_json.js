import { NODE_LTS_VERSION } from "@undercut/config";
import { modifyJsonFile } from "@undercut/config/modify_json_file.js";

modifyJsonFile(json => {
	if (json.engines.node !== `>=${NODE_LTS_VERSION}`) throw new Error(`Outdated node version in package.json`);

	json.exports = {
		".": `./src/index.js`,
		"./node": `./node/index.js`,
		"./pull": `./pull/index.js`,
		"./push": `./push/index.js`,
		"./utils": `./utils/index.js`,
		"./utils/array": `./utils/src/array.js`,
		"./utils/assert": `./utils/src/assert.js`,
		"./package.json": `./package.json`,
	};
});
