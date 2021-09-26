import { modifyJsonFile } from "@undercut/config/modify_json_file.js";

modifyJsonFile(json => {
	delete json.main;
	json.types = `./src/index.d.ts`;
});
