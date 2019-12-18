"use strict";

const { projects: rootProjects } = require(`./jest.config.root.cjs`);

function referRootProjects() {
	return rootProjects.map(p => p.replace(`/packages/`, `/../`));
}

module.exports = {
	referRootProjects,
};
