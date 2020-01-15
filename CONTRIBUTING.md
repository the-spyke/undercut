# Contributing to `undercut`

Please ensure that you have the latest [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).

## Quicklinks

- [Setup](#setup)
- [Git](#git)
- [Linting](#linting)
- [Tests](#tests)
- [Build](#build)
- [Dist](#dist)

## Setup

This project follows [GitHub's standard forking model](https://guides.github.com/activities/forking/). Please fork the project to submit pull requests.

Clone your fork:

```sh
git clone https://github.com/${username}/undercut.git
cd undercut
```

`Undercut` is a monorepo based on [Yarn Workspaces](https://yarnpkg.com/en/docs/workspaces). Yarn is also used for managing dependencies, running scripts, etc.

Install Node modules before running any scripts:

```sh
yarn install
```

### Workflow

1. Create a branch from the `master` with a meaningful name like `fix-{something}`.
2. Make your changes.
3. Make sure that tests pass: `yarn test`.
4. Check linting errors: `yarn lint`.
5. Check that build works: `yarn build`.
6. Make required documentation changes.
7. Commit your changes and push the branch.
8. Submit a pull request to the upstream repository.
9. Make sure that CI build has no issues.

### Making a commit

The project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Commit types:

- `fix` -- a bug fix.
- `feature` -- a new feature.
- `refactor` -- code refactoring: big/structural changes without adding new features or fixing bugs.
- `polish` -- code style, typos, and other small changes not affecting functionality.
- `chore` -- build scripts, infrastructure, configuration, dependencies, and maintenance tasks.
- `docs` -- documentation related changes.
- `perf` -- performance related changes (hopefully, an improvement).
- `test` -- changes in tests.

Scope types:

- Package related: `cli`, `pull`, `push`, `utils`.
- `deps` -- changes in dependencies and updates.
- `release` -- release related changes and version bumps.
- any other that makes sence.

## Linting

Linting is done by [ESLint](https://eslint.org). Script's name is `"lint"`, and it's available at both the root (lints the entire monorepo) and an individual package level (lints just that package):

```sh
yarn lint
```

No output means `OK`. You can pass additional options to ESLint here.

## Tests

Tests are done with [Jest](https://jestjs.io/). Script's name is `"test"`, and it's available at both the root (tests primary packages) and an individual package level (tests just that package):

```sh
yarn test
```

You can pass additional options (like `"--watch"`) to Jest here. [The list of packages tested from the root.](packages/undercut-config/jest/jest.config.root.cjs)

Add `"--coverage"` to see test coverage.

## Build

Build is done with the `"build"` script at an individual package level. Some projects doesn't have a `build` step right now, in this case there will be a message in terminal that build step is empty. If the build step isn't empty, built files go to the `build` directory in the respective package.

## Dist

The `"dist"` script produces tarballs ready for distribution or publishing in the `dist` folder.

## Documentation

Documentation is written in Markdown or MDX and is located in the `docs` folder. The files will be used later to build and publish static pages on [undercut.js.org](https://undercut.js.org).

If you're adding a new document, don't forget to reference it on the website's [sidebar](website/sidebar.js).

## Website

The [website](https://undercut.js.org) is built with [Docusaurus](https://docusaurus.io/) and published to the `gp-pages` branch and [GitHub Pages](https://pages.github.com) service.

Algolia search configuration is located in [their repo](https://github.com/algolia/docsearch-configs/blob/master/configs/the-spyke_undercut.json).
