import { modifyJsonFile } from "@undercut/config/modify_json_file.js";

modifyJsonFile(json => {
	json.main = `./lib/index.js`;
	json.bin.undercut = `./lib/cli.js`;
	json.types = `./lib/index.d.ts`;
});
