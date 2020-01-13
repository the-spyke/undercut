/* eslint-env react */

import cx from "classnames";
import React from "react";
import PropTypes from "prop-types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

import styles from './styles.module.css';

const features = [
	{
		title: `Lazy Evaluation`,
		imageUrl: `img/undraw_barber.svg`,
		description: `Undercut was designed around native Iterators and Observers. Everything is evaluated lazily.`,
	},
	{
		title: `Extensible`,
		imageUrl: `img/undraw_deliveries.svg`,
		description: `You can write, use, and share your own operations without frustration. As simple as functions can be.`,
	},
	{
		title: `Balanced API`,
		imageUrl: `img/undraw_dev_focus.svg`,
		description: `Not too imperative, not too functional. The API undercut provides is small and friendly.`,
	},
];

Feature.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

function Feature({ imageUrl, title, description }) {
	return (
		<div className={cx(`col col--4`, styles.feature)}>
			<div className="text--center">
				<img className={styles.featureImage} src={useBaseUrl(imageUrl)} alt={title} />
			</div>
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	);
}

export default function Home() {
	const context = useDocusaurusContext();
	const { siteConfig = {} } = context;

	return (
		<Layout title={siteConfig.title} description={siteConfig.tagline}>
			<header className={cx(`hero hero--primary`, styles.heroBanner)}>
				<div className="container">
					<h1 className="hero__title">✂ {siteConfig.title} ✂</h1>
					<p className="hero__subtitle">{siteConfig.tagline}</p>
					<div className={styles.buttons}>
						<Link
							className={cx(`button button--outline button--secondary button--lg`, styles.getStarted)}
							to={useBaseUrl(`docs/doc1`)}
						>
							Get Started
						</Link>
					</div>
				</div>
			</header>
			<main>
				<section className={styles.features}>
					<div className="container">
						<div className="row">
							{features.map((props, index) => (
								<Feature key={index} {...props} />
							))}
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
}
