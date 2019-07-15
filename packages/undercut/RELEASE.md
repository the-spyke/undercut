# Release process

1. Run tests with `yarn test`.
2. Run ESLint with `yarn lint`.
3. Make a tarball with `npm pack` and test-install it locally.
4. Bump version in `package.json` and `CHANGELOG.md`, make a commit.
5. Add an annotated tag with corresponding version like `v1.2.3`.
6. Publish the release with `npm publish`.
7. Copy the release notes from `CHANGELOG.md` to `GitHub Releases`.
