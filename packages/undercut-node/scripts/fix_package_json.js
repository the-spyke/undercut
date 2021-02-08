import modifyJsonFile from "@undercut/config/modify_json_file.cjs";

modifyJsonFile(json => {
	// delete json.exports;

	json.exports = {
		".": `./src/index.js`,
		"./node": `./node/index.js`,
		"./pull": `./pull/index.js`,
		"./push": `./push/index.js`,
		"./utils": `./utils/index.js`,
	};
});
