'use strict';

const { readFile } = require(`fs/promises`);
const { resolve } = require(`path`);

const addBangNotes = require(`./add_bang_notes.js`);

/**
 * Handlebar partials for various property substitutions based on commit context.
 */
const owner = `{{#if this.owner}}{{this.owner}}{{else}}{{@root.owner}}{{/if}}`;
const host = `{{@root.host}}`;
const repository = `{{#if this.repository}}{{this.repository}}{{else}}{{@root.repository}}{{/if}}`;
const sections = {
	NewFeature: `:rocket: New Feature`,
	BugFix: `:bug: Bug Fix`,
	Polish: `:nail_care: Polish`,
	Documentation: `:memo: Documentation`,
	Internal: `:house: Internal`,
	Performance: `:running_woman: Performance`,
	Revert: `:leftwards_arrow_with_hook: Revert`,
};
const sectionsOrder = new Map(Object.keys(sections).map((k, i) => [sections[k], i]));

module.exports = async function getWriterOpts(config) {
	config = defaultConfig(config);

	const transform = getTransform(config);

	return {
		mainTemplate: await loadTemplate(`../templates/template.hbs`),
		headerPartial: await loadHeaderPartial(config),
		commitPartial: await loadCommitPartial(config),
		footerPartial: await loadTemplate(`../templates/footer.hbs`),
		groupBy: `type`,
		commitGroupsSort,
		commitsSort,
		noteGroupsSort: `title`,
		transform,
	};
};

function getTransform(config) {
	const skippedCommits = new Set();
	const typesLookup = new Map();

	config.types.forEach(type => {
		typesLookup.set(type.type, type);
	});

	return (commit, context) => {
		const issues = [];
		const typeKey = (commit.revert ? `revert` : (commit.type || ``)).toLowerCase();

		// Adds additional breaking change notes
		// for the special case, test(system)!: hello world, where there is
		// a '!' but no 'BREAKING CHANGE' in body:
		addBangNotes(commit);

		commit.notes.forEach(note => {
			note.title = `BREAKING CHANGE`;
		});

		const commitType = typesLookup.get(typeKey);

		// Breaking changes attached to any type are still displayed.
		if (!commit.notes.length && (!commitType || commitType.hidden)) {
			if (!skippedCommits.has(commit.hash)) {
				skippedCommits.add(commit.hash);

				console.info(`> Skipping commit: ${commit.hash}\n${commit.header}`); // eslint-disable-line no-console
			}

			return undefined;
		}

		if (commitType) {
			commit.type = commitType.section;
		}

		if (commit.scope === `*` || !commit.scope) {
			commit.scope = ``;
		}

		if (typeof commit.hash === `string`) {
			commit.shortHash = commit.hash.substring(0, 7);
		}

		if (typeof commit.subject === `string`) {
			// Issue URLs.
			const re = new RegExp(`(${config.issuePrefixes.join(`|`)})([0-9]+)`, `g`);

			commit.subject = commit.subject.replace(re, (_, prefix, issue) => {
				issues.push(prefix + issue);

				const url = expandTemplate(config.issueUrlFormat, {
					host: context.host,
					owner: context.owner,
					repository: context.repository,
					id: issue,
					prefix: prefix
				});

				return `[${prefix}${issue}](${url})`;
			});

			// User URLs.
			commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, user) => {
				// TODO: investigate why this code exists.
				if (user.includes(`/`)) {
					return `@${user}`;
				}

				const usernameUrl = expandTemplate(config.userUrlFormat, {
					host: context.host,
					owner: context.owner,
					repository: context.repository,
					user: user
				});

				return `[@${user}](${usernameUrl})`;
			});
		}

		// Remove references that already appear in the subject.
		commit.references = commit.references.filter(reference => !issues.includes(reference.prefix + reference.issue));

		return commit;
	};
}

// merge user set configuration with default configuration.
function defaultConfig(config) {
	return {
		commitUrlFormat: `{{host}}/{{owner}}/{{repository}}/commit/{{hash}}`,
		compareUrlFormat: `{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}`,
		issuePrefixes: [`#`],
		issueUrlFormat: `{{host}}/{{owner}}/{{repository}}/issues/{{id}}`,
		releaseCommitMessageFormat: `chore(release): {{currentTag}}`,
		types: [
			{ type: `feat`, section: sections.NewFeature },
			{ type: `feature`, section: sections.NewFeature },
			{ type: `fix`, section: sections.BugFix },
			{ type: `polish`, section: sections.Polish },
			{ type: `refactor`, section: sections.Polish },
			{ type: `docs`, section: sections.Documentation },
			{ type: `chore`, section: sections.Internal },
			{ type: `test`, section: sections.Internal },
			{ type: `perf`, section: sections.Performance },
			{ type: `revert`, section: sections.Revert },
		],
		userUrlFormat: `{{host}}/{{user}}`,
		...config,
	};
}

function commitGroupsSort(groupA, groupB) {
	const rankA = sectionsOrder.get(groupA.title) ?? 1000;
	const rankB = sectionsOrder.get(groupB.title) ?? 1000;

	return rankA - rankB;
}

function compareStrings(a, b) {
	if (a < b) return -1;
	if (a > b) return 1;

	return 0;
}

function commitsSort(commitA, commitB) {
	const scopeRank = compareStrings(commitA.scope, commitB.scope);

	if (scopeRank === 0) return compareStrings(commitA.subject, commitB.subject);
	if (!commitA.scope) return 1;
	if (!commitB.scope) return -1;

	return scopeRank;
}

async function loadHeaderPartial(config) {
	const header = await loadTemplate(`../templates/header.hbs`);
	const compareUrlFormat = expandTemplate(config.compareUrlFormat, {
		host,
		owner,
		repository
	});

	return header.replace(/{{compareUrlFormat}}/g, compareUrlFormat);
}

async function loadCommitPartial(config) {
	const commit = await loadTemplate(`../templates/commit.hbs`);
	const commitUrlFormat = expandTemplate(config.commitUrlFormat, {
		host,
		owner,
		repository
	});
	const issueUrlFormat = expandTemplate(config.issueUrlFormat, {
		host,
		owner,
		repository,
		id: `{{this.issue}}`,
		prefix: `{{this.prefix}}`
	});

	return commit
		.replace(/{{commitUrlFormat}}/g, commitUrlFormat)
		.replace(/{{issueUrlFormat}}/g, issueUrlFormat);
}

function loadTemplate(path) {
	return readFile(resolve(__dirname, path), `utf-8`);
}

// expand on the simple mustache-style templates supported in
// configuration (we may eventually want to use handlebars for this).
function expandTemplate(template, context) {
	return Object.keys(context).reduce((acc, key) => acc.replace(new RegExp(`{{${key}}}`, `g`), context[key]), template);
}
