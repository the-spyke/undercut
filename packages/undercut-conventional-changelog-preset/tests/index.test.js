'use strict';

const path = require(`path`);

const { afterEach, beforeEach, describe, expect, test } = require(`@jest/globals`);
const conventionalChangelogCore = require(`conventional-changelog-core`);

const gitDummyCommit = require(`git-dummy-commit`);
const shell = require(`shelljs`);

const URL = require(`../package.json`).repository.url;
const getUndercutPreset = require(`../src/index.js`);

function setupBaseCommits() {
	gitDummyCommit([`chore(build)!: first build setup`, `BREAKING CHANGE: New build system.`]);
	gitDummyCommit([`chore(ci): add TravisCI pipeline`, `BREAKING CHANGE: Continuously integrated.`]);
	gitDummyCommit([`Feat: amazing new module`, `BREAKING CHANGE: Not backward compatible.`]);
	gitDummyCommit([`Fix(compile): avoid a bug`, `BREAKING CHANGE: Quite a big change.`]);
	gitDummyCommit([`perf(ngOptions): make it faster`, ` closes #1, #2`]);
	gitDummyCommit([`fix(changelog): proper issue links`, ` see #1, conventional-changelog/standard-version#358`]);
	gitDummyCommit(`revert(ngOptions): bad commit`);
	gitDummyCommit(`fix(*): oops`);
	gitDummyCommit([`fix(changelog): proper issue links`, ` see GH-1`]);
	gitDummyCommit([`feat(awesome): adress EXAMPLE-1`]);
}

function setupBreakingChangeCommits() {
	gitDummyCommit([`chore(travis): setup travis`, `BREAKING CHANGE: The Change is huge.`]);
	gitDummyCommit([`docs(readme): make it clear`, `BREAKING CHANGE: The Change is huge.`]);
	gitDummyCommit([`polish(whitespace): make it easier to read`, `BREAKING CHANGE: The Change is huge.`]);
	gitDummyCommit([`refactor(code): change a lot of code`, `BREAKING CHANGE: The Change is huge.`]);
	gitDummyCommit([`test(*)!: more tests`, `BREAKING CHANGE: The Change is huge.`]);
}

async function getChangelog(presetOptions, coreOptions) {
	const changelogStream = conventionalChangelogCore({
		config: getUndercutPreset(presetOptions),
		...coreOptions
	});

	changelogStream.setEncoding(`utf8`);

	let changelog = ``;

	for await (const chunk of changelogStream) {
		changelog += chunk;
	}

	return changelog;
}

describe(`Undercut Preset`, () => {
	beforeEach(() => {
		shell.config.resetForTesting();
		shell.cd(__dirname);
		shell.rm(`-rf`, `tmp`);
		shell.mkdir(`tmp`);
		shell.cd(`tmp`);
		shell.mkdir(`git-templates`);
		shell.exec(`git init --template=./git-templates`);
		shell.exec(`git config user.email "bot@example.com"`);
		shell.exec(`git config user.name Bot`);
		shell.exec(`git commit -m "chore: initial commit" --allow-empty --no-gpg-sign`);

		setupBaseCommits();
	});

	afterEach(() => {
		shell.cd(__dirname);
		shell.rm(`-rf`, `tmp`);
	});

	test(`should work if there is no semver tag`, async () => {
		const changelog = await getChangelog();

		expect(changelog).toMatch(`first build setup`);
		expect(changelog).toMatch(`**ci:** add TravisCI pipeline`);
		expect(changelog).toMatch(`**ci:** Continuously integrated.`);
		expect(changelog).toMatch(`amazing new module`);
		expect(changelog).toMatch(`**compile:** avoid a bug`);
		expect(changelog).toMatch(`make it faster`);
		expect(changelog).toMatch(`, closes [#1](${URL}/issues/1)`);
		expect(changelog).toMatch(`New build system.`);
		expect(changelog).toMatch(`Not backward compatible.`);
		expect(changelog).toMatch(`**compile:** Quite a big change.`);
		expect(changelog).toMatch(`Internal`);
		expect(changelog).toMatch(`Feature`);
		expect(changelog).toMatch(`Bug Fix`);
		expect(changelog).toMatch(`Performance`);
		expect(changelog).toMatch(`Revert`);
		expect(changelog).toMatch(`bad commit`);
		expect(changelog).toMatch(`BREAKING CHANGE`);

		expect(changelog).not.toMatch(`feat`);
		expect(changelog).not.toMatch(`fix`);
		expect(changelog).not.toMatch(`perf`);
		expect(changelog).not.toMatch(`revert`);
		expect(changelog).not.toMatch(`***:**`);
		expect(changelog).not.toMatch(`: Not backward compatible.`);
	});

	test(`should group sections in order of importance`, async () => {
		const changelog = await getChangelog();

		expect(
			changelog.indexOf(`BREAKING CHANGE`) < changelog.indexOf(`Feature`) &&
			changelog.indexOf(`Feature`) < changelog.indexOf(`Bug Fix`) &&
			changelog.indexOf(`Bug Fix`) < changelog.indexOf(`Performance`) &&
			changelog.indexOf(`Performance`) < changelog.indexOf(`Revert`)
		).toBe(true);
	});

	test(`should sort commits at first by scope and at second by subject`, async () => {
		shell.exec(`git tag v0.1.0`);
		gitDummyCommit(`fix(cc): order-3`);
		gitDummyCommit(`fix(*): order-5`);
		gitDummyCommit(`fix(bb): order-2`);
		gitDummyCommit(`fix(aa): order-1`);
		gitDummyCommit(`fix: order-4`);

		const changelog = await getChangelog({}, {
			outputUnreleased: true,
		});

		expect(
			changelog.indexOf(`order-1`) < changelog.indexOf(`order-2`) &&
			changelog.indexOf(`order-2`) < changelog.indexOf(`order-3`) &&
			changelog.indexOf(`order-3`) < changelog.indexOf(`order-4`) &&
			changelog.indexOf(`order-4`) < changelog.indexOf(`order-5`)
		).toBe(true);
	});

	test(`should not list breaking change twice if ! is used`, async () => {
		const changelog = await getChangelog();

		expect(changelog).not.toMatch(/\* first build setup\r?\n/);
	});

	test(`should allow alternative "types" configuration to be provided`, async () => {
		const changelog = await getChangelog({
			types: []
		});

		expect(changelog).toMatch(`first build setup`);
		expect(changelog).toMatch(`**ci:** add TravisCI pipeline`);
		expect(changelog).toMatch(`**ci:** Continuously integrated.`);
		expect(changelog).toMatch(`amazing new module`);
		expect(changelog).toMatch(`**compile:** avoid a bug`);
		expect(changelog).toMatch(`Feat`);

		expect(changelog).not.toMatch(`make it faster`);
		expect(changelog).not.toMatch(`Revert`);
	});

	test(`should properly format external repository issues`, async () => {
		const changelog = await getChangelog();

		expect(changelog).toMatch(`[#1](${URL}/issues/1)`);
		expect(changelog).toMatch(`[conventional-changelog/standard-version#358](https://github.com/conventional-changelog/standard-version/issues/358)`);
	});

	test(`should properly format external repository issues given an \`issueUrlFormat\``, async () => {
		const changelog = await getChangelog({
			issuePrefixes: [`#`, `GH-`],
			issueUrlFormat: `issues://{{repository}}/issues/{{id}}`,
		});

		expect(changelog).toMatch(`[#1](issues://undercut/issues/1)`);
		expect(changelog).toMatch(`[conventional-changelog/standard-version#358](issues://standard-version/issues/358)`);
		expect(changelog).toMatch(`[GH-1](issues://undercut/issues/1)`);
	});

	test(`should properly format issues in external issue tracker given an 'issueUrlFormat' with a 'prefix'`, async () => {
		const changelog = await getChangelog({
			issuePrefixes: [`EXAMPLE-`],
			issueUrlFormat: `https://example.com/browse/{{prefix}}{{id}}`,
		});

		expect(changelog).toMatch(`[EXAMPLE-1](https://example.com/browse/EXAMPLE-1)`);
	});

	test(`should replace #[0-9]+ with GitHub format issue URL by default`, async () => {
		gitDummyCommit([`feat(awesome): addresses the issue brought up in #133`]);

		const changelog = await getChangelog();

		expect(changelog).toMatch(`[#133](${URL}/issues/133)`);
	});

	test(`should remove the issues that already appear in the subject`, async () => {
		gitDummyCommit([`feat(awesome): fix #88`]);

		const changelog = await getChangelog();

		expect(changelog).toMatch(`fix [#88](${URL}/issues/88)`);
		expect(changelog).not.toMatch(`closes [#88](${URL}/issues/88)`);
	});

	test(`should replace @user with configured userUrlFormat`, async () => {
		gitDummyCommit([`feat(awesome): issue brought up by @bcoe! on Friday`]);

		const changelog = await getChangelog({
			userUrlFormat: `https://foo/{{user}}`,
		});

		expect(changelog).toMatch(`[@bcoe](https://foo/bcoe)`);
	});

	test(`should not discard commit if there is BREAKING CHANGE`, async () => {
		setupBreakingChangeCommits();

		const changelog = await getChangelog();

		expect(changelog).toMatch(`The Change is huge.`);
		expect(changelog).toMatch(`**travis:** setup travis`);
		expect(changelog).toMatch(`**readme:** make it clear`);
		expect(changelog).toMatch(`**whitespace:** make it easier to read`);
		expect(changelog).toMatch(`**code:** change a lot of code`);
		expect(changelog).toMatch(`more tests`);
	});

	test(`should omit optional ! in breaking commit`, async () => {
		setupBreakingChangeCommits();

		const changelog = await getChangelog();

		expect(changelog).toMatch(`* more tests (`);
	});

	test(`should work if there is a semver tag`, async () => {
		shell.exec(`git tag v0.1.0`);
		gitDummyCommit(`feat: some more feats`);

		const changelog = await getChangelog({}, {
			outputUnreleased: true,
		});

		expect(changelog).toMatch(`[v1.0.0]`);
		expect(changelog).toMatch(`New Feature`);
		expect(changelog).toMatch(`some more feats`);
	});

	test(`should support "feature" as alias for "feat"`, async () => {
		shell.exec(`git tag v0.1.0`);
		gitDummyCommit(`feature: some more features`);

		const changelog = await getChangelog({}, {
			outputUnreleased: true,
		});

		expect(changelog).toMatch(`New Feature`);
		expect(changelog).toMatch(`* some more features (`);
	});

	test(`should work with unknown host`, async () => {
		shell.exec(`git tag v0.1.0`);
		gitDummyCommit(`fix: unknown host`);

		const changelog = await getChangelog({
			commitUrlFormat: `http://unknown/commit/{{hash}}`,
			compareUrlFormat: `http://unknown/compare/{{previousTag}}...{{currentTag}}`,
		}, {
			pkg: {
				path: path.join(__dirname, `fixtures/unknown-host.json`),
			},
		});

		expect(changelog).toMatch(`(http://unknown/compare`);
		expect(changelog).toMatch(`](http://unknown/commit/`);
	});

	test(`should work specifying where to find a package.json using conventional-changelog-core`, async () => {
		shell.exec(`git tag v1.0.0`);
		gitDummyCommit([`feat(*): implementing #5 by @dlmr`, ` closes #10`]);

		const changelog = await getChangelog({}, {
			pkg: {
				path: path.join(__dirname, `fixtures/known-host.json`),
			},
		});

		expect(changelog).toMatch(`(https://github.com/conventional-changelog/example/compare`);
		expect(changelog).toMatch(`](https://github.com/conventional-changelog/example/commit/`);
		expect(changelog).toMatch(`](https://github.com/conventional-changelog/example/issues/`);
	});

	test(`should fallback to the closest package.json when not providing a location for a package.json`, async () => {
		shell.exec(`git tag v1.0.0`);
		gitDummyCommit([`feat(*): implementing #5 by @dlmr`, ` closes #10`]);

		const changelog = await getChangelog({}, {
			outputUnreleased: true,
		});

		expect(changelog).toMatch(`(${URL}/compare`);
		expect(changelog).toMatch(`](${URL}/commit/`);
		expect(changelog).toMatch(`](${URL}/issues/`);
	});

	test(`should support non public GitHub repository locations`, async () => {
		shell.exec(`git tag v1.0.0`);
		gitDummyCommit([`feat(*): implementing #5 by @dlmr`, ` closes #10`]);

		const changelog = await getChangelog({}, {
			pkg: {
				path: path.join(__dirname, `fixtures/ghe-host.json`),
			},
		});

		expect(changelog).toMatch(`(https://github.internal.example.com/dlmr`);
		expect(changelog).toMatch(`(https://github.internal.example.com/conventional-changelog/internal/compare`);
		expect(changelog).toMatch(`](https://github.internal.example.com/conventional-changelog/internal/commit/`);
		expect(changelog).toMatch(`5](https://github.internal.example.com/conventional-changelog/internal/issues/5`);
		expect(changelog).toMatch(` closes [#10](https://github.internal.example.com/conventional-changelog/internal/issues/10)`);
	});

	test(`should only replace with link to user if it is an username`, async () => {
		gitDummyCommit([`fix: use npm@5 (@username)`]);
		gitDummyCommit([`chore(deps): bump @dummy/package from 7.1.2 to 8.0.0`, `BREAKING CHANGE: Dummy 7.x is not supported anymore.`]);

		const changelog = await getChangelog();

		expect(changelog).not.toMatch(`(https://github.com/5`);
		expect(changelog).toMatch(`(https://github.com/username`);

		expect(changelog).not.toMatch(`[@dummy](https://github.com/dummy)/package`);
		expect(changelog).toMatch(`bump @dummy/package from`);
	});

	test(`supports multiple lines of footer information`, async () => {
		gitDummyCommit([
			`feat: complex new feature`,
			`this is a complex new feature with many reviewers`,
			`Reviewer: @hutson`,
			`Fixes: #99`,
			`Refs: #100`,
			`BREAKING CHANGE: this completely changes the API`
		]);

		const changelog = await getChangelog();

		expect(changelog).toMatch(`closes [#99]`);
		expect(changelog).toMatch(`[#100]`);
		expect(changelog).toMatch(`this completely changes the API`);
	});

	test(`does not require that types are case sensitive`, async () => {
		gitDummyCommit([`FEAT(foo)!: incredible new flag FIXES: #33`]);

		const changelog = await getChangelog();

		expect(changelog).toMatch(`incredible new flag`);
	});

	test(`populates breaking change if ! is present`, async () => {
		gitDummyCommit([`FEAT(foo)!: incredible new flag FIXES: #33`]);

		const changelog = await getChangelog();

		expect(changelog).toMatch(/incredible new flag FIXES: #33\r?\n/);
	});

	test(`parses revert commits`, async () => {
		gitDummyCommit([`revert: feat: custom revert format`, `This reverts commit 5678.`]);

		const changelog = await getChangelog();

		expect(changelog).toMatch(`custom revert format`);
	});
});
