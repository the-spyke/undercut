import { modifyJsonFile } from "@undercut/config/modify_json_file.js";

modifyJsonFile(json => {
	json.main = `./src/index.js`;
	json.types = `./src/index.d.ts`;
});
