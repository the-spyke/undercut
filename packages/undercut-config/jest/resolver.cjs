const { join } = require(`path`);

module.exports = (request, options) => {
	const match = request.match(/^(@undercut\/\w+)(\/\w+)+$/i);

	if (match) {
		const pkgName = match[1];
		const exportName = `.${match[2]}`;
		const pkgJsonPath = join(pkgName, `package.json`);
		const pkgJson = require(pkgJsonPath);

		if (pkgJson.exports) {
			const exportPath = pkgJson.exports[exportName];

			if (!exportPath) throw new Error(`Export "${exportName}" unfound in "${pkgJsonPath}" for request "${request}"`);
			if (typeof exportPath !== `string`) throw new Error(`Export "${exportName}" is not a string in "${pkgJsonPath}" for request "${request}"`);

			const fixedRequest = join(pkgName, exportPath);

			return options.defaultResolver(fixedRequest, options);
		}
	}

	return options.defaultResolver(request, options);
};
