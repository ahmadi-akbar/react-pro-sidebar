# Contributing

Thanks for contributing to react-pro-sidebar!

## Development

```bash
yarn install      # install dependencies
yarn start        # build the library in watch mode (tsup)
yarn storybook    # run Storybook for interactive development
yarn test         # run the test suite (vitest)
yarn lint         # lint
yarn typecheck    # type-check
yarn build        # production build
yarn size         # check the bundle size budget
```

A pre-commit hook (husky + lint-staged) runs ESLint and Prettier on staged
files automatically.

## Releases & changesets

This project uses [Changesets](https://github.com/changesets/changesets) to
manage versioning and the changelog.

### When you make a user-facing change

Add a changeset describing it:

```bash
yarn changeset
```

You'll be prompted for:

1. **The bump type** — `patch` (bug fix), `minor` (new feature, backwards
   compatible), or `major` (breaking change).
2. **A short summary** — this becomes the changelog entry.

This creates a markdown file in `.changeset/`. **Commit it with your PR.**
You don't need a changeset for changes that don't affect published code
(tests, CI, docs, internal refactors).

### How a release happens

1. PRs with changesets get merged to `master`.
2. The release workflow opens (and keeps updating) a **"Version Packages"**
   pull request that consumes the pending changesets — bumping the version in
   `package.json` and updating `CHANGELOG.md`.
3. Merging that PR publishes the new version to npm and tags the release.

You generally never edit `package.json`'s version or `CHANGELOG.md` by hand —
changesets does it for you.
