/* eslint-env node*/

module.exports = {
	title: `Undercut`,
	tagline: `JavaScript data processing pipelines and utilities`,
	url: `https://undercut.js.org`,
	baseUrl: `/`,
	favicon: `img/favicon.ico`,
	organizationName: `the-spyke`,
	projectName: `undercut`,
	themeConfig: {
		navbar: {
			title: `Undercut`,
			logo: {
				alt: `logo`,
				src: `img/logo-192x192.png`,
			},
			links: [
				{ to: `docs/introduction`, label: `Docs`, position: `left` },
				{
					href: `https://codesandbox.io/s/undercut-demo-1up46?fontsize=14&hidenavigation=1&moduleview=1&theme=dark&previewwindow=console`,
					label: `Try it out`,
				},
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
		algolia: {
			apiKey: `51afb3f562cf52544110b900593b21e9`,
			indexName: `the-spyke_undercut`,
			algoliaOptions: {}
		},
		googleAnalytics: {
			trackingID: `UA-156198423-1`,
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
