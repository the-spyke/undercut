"use strict";

const { projects: rootProjects } = require(`./jest.config.root.cjs`);

function referRootProjects(exclude = []) {
	const excludedRootProjects = new Set(exclude);

	return rootProjects
		.filter(p => {
			const projectName = p.split(`/`).filter(Boolean).pop();

			return !excludedRootProjects.has(projectName);
		})
		.map(rootPath => rootPath.replace(`/packages/`, `/../`));
}

module.exports = {
	referRootProjects,
};
