import rootConfig from "./jest.config.root.js";

export function referRootProjects() {
	return rootConfig.projects.map(p => p.replace(`/packages/`, `/../`));
}
