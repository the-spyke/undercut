import { modifyJsonFile } from "@undercut/config/modify_json_file.js";

modifyJsonFile(json => {
	json.type = `commonjs`;
	delete json.exports;
});
