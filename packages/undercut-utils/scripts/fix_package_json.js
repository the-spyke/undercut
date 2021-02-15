import { modifyJsonFile } from "@undercut/config/modify_json_file.js";

modifyJsonFile(json => {
	json.main = `./src/index.js`;
	json.types = `./src/index.d.ts`;
	json.exports = {
		".": `./src/index.js`,
		"./array": `./src/array.js`,
		"./assert": `./src/assert.js`,
		"./package.json": `./package.json`
	};
});
