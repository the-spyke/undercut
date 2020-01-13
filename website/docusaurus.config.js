/* eslint-env node*/

module.exports = {
	title: `undercut`,
	tagline: `JavaScript data processing pipelines and utilities`,
	url: `https://the-spyke.github.io`,
	baseUrl: `/undercut/`,
	favicon: `img/favicon.ico`,
	organizationName: `the-spyke`,
	projectName: `undercut`,
	themeConfig: {
		navbar: {
			title: `undercut`,
			logo: {
				alt: `logo`,
				src: `img/logo-192x192.png`,
			},
			links: [
				{ to: `docs/introduction`, label: `Docs`, position: `left` },
				{ to: `blog`, label: `Blog`, position: `left` },
				{ to: `support`, label: `Support`, position: `left` },
				{
					href: `https://github.com/the-spyke/undercut/releases`,
					label: `Releases`,
				},
				{
					href: `https://github.com/the-spyke/undercut`,
					label: `GitHub`,
					position: `right`,
				},
			],
		},
		footer: {
			style: `dark`,
			copyright: `Built with Docusaurus. Hosted on GitHub.`,
		},
	},
	presets: [
		[
			`@docusaurus/preset-classic`,
			{
				docs: {
					editUrl: `https://github.com/the-spyke/undercut/edit/master/docs/`,
					path: `../docs`,
					sidebarPath: require.resolve(`./sidebars.js`),
				},
				theme: {
					customCss: require.resolve(`./src/css/custom.css`),
				},
			},
		],
	],
};
