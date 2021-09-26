/* eslint-env node*/

const lightCodeTheme = require(`prism-react-renderer/themes/github`);
const darkCodeTheme = require(`prism-react-renderer/themes/dracula`);

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: `Undercut`,
	tagline: `JavaScript lazy data processing pipelines and utilities`,
	url: `https://undercut.js.org`,
	baseUrl: `/`,
	favicon: `img/favicon.ico`,
	onBrokenLinks: `throw`,
	onBrokenMarkdownLinks: `warn`,
	presets: [
		[
			`@docusaurus/preset-classic`,
			/** @type {import('@docusaurus/preset-classic').Options} */
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
	/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
	themeConfig: {
		navbar: {
			title: `Undercut`,
			logo: {
				alt: `logo`,
				src: `img/logo-192x192.png`,
			},
			items: [
				{ to: `docs/introduction`, label: `Docs`, position: `left` },
				{
					href: `https://dev.to/t/undercutjs/latest`,
					label: `Blog`,
					position: `left`,
				},
				{
					href: `https://github.com/the-spyke/undercut/releases`,
					label: `Releases`,
					position: `left`,
				},
				{
					href: `https://codesandbox.io/s/undercut-demo-1up46?fontsize=14&hidenavigation=1&moduleview=1&theme=dark&previewwindow=console`,
					label: `Try it out`,
					position: `left`,
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
			copyright: `Built with Docusaurus. Hosted on Netlify`,
		},
		algolia: {
			apiKey: `51afb3f562cf52544110b900593b21e9`,
			indexName: `the-spyke_undercut`,
		},
		googleAnalytics: {
			trackingID: `UA-156198423-1`,
		},
		prism: {
			theme: lightCodeTheme,
			darkTheme: darkCodeTheme,
		},
	},
};
