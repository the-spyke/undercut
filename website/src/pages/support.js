import React from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Layout from "@theme/Layout";

export default function Support() {
	const context = useDocusaurusContext();
	const { siteConfig = {} } = context;

	return (
		<Layout title={siteConfig.title} description={siteConfig.tagline}>
			<div className="container">
				<div className="row">
					<div className="col col--6 col--offset-3 padding-vert--lg">
						<h1>Need Help?</h1>

						<h2>Ask a question</h2>
						<p>You may open an issue with label &quot;Issue: Question&quot; on <a href="https://github.com/the-spyke/undercut/issues" target="blank">GitHub</a>.</p>

						<h2>Twitter</h2>
						<p>Use <a href="https://twitter.com/hashtag/undercutjs" target="blank">#undercutjs</a> hash tag on <b>Twitter</b>. You may also ask <a href="https://twitter.com/the_spyke" target="blank">@the_spyke</a> here directly.</p>

						<h2>DEV Community</h2>
						<p>Use <a href="https://dev.to/t/undercutjs/latest" target="blank">#undercutjs</a> tag on <b>DEV.to</b> to find posts, ask for help, or just discuss Undercut.</p>

						<h2>License</h2>
						<p>
							The code is licensed under the <a rel="license" href="https://github.com/the-spyke/undercut/blob/master/LICENSE" target="blank">MIT License</a>.
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}
