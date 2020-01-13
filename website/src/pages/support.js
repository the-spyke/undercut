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
						<p>You may open an issue with label &quot;Issue: Question&quot; on <a href="https://github.com/the-spyke/undercut/issues">GitHub</a>.</p>

						<h2>Twitter</h2>
						<p><a href="https://twitter.com/search?q=%23undercutjs">#undercutjs</a> hash tag on Twitter is used to keep up with the latest undercut news.</p>

						<h2>License</h2>
						<p>
							The code is licensed under the <a rel="license" href="https://github.com/the-spyke/undercut/blob/master/LICENSE">MIT License</a>.
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}
