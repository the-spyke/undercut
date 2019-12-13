"use strict";

const { projects: rootProjects } = require(`./jest.config.root.cjs`);

function referRootProjects() {
	return rootProjects.map(rootPath => rootPath.replace(`/packages/`, `/../`));
}

module.exports = {
	referRootProjects,
};
