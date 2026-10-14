# Contributing

Thanks for helping improve `simple-virtualization`! This guide covers local setup, the checks your change must pass, and how releases work.

By participating you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). To report a security issue, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.

## Development setup

Requirements: Node.js (version in [.node-version](.node-version)) and npm.

```bash
git clone https://github.com/izaccavalheiro/virtualization.git
cd virtualization
npm ci
npm run validate   # lint, typecheck, tests + coverage, build, size budget, package lint
npm run example    # optional: run the example app
```

Project layout, commands, code conventions and the SemVer compatibility contract are documented in [AGENTS.md](AGENTS.md). It is written for both humans and AI coding agents; please read it before your first PR.

## Making a change

1. Open an issue first for anything beyond a small fix, so we can agree on the approach and on whether it is a patch, minor or major change.
2. Create a branch from `main`.
3. Make the change with tests in [src/__tests__/](src/__tests__/).
4. Run `npm run validate`. If you changed anything under `src/`, run `npm run build` and commit the regenerated `dist/` (CI checks that it is in sync).
5. Add a line to [CHANGELOG.md](CHANGELOG.md) under `## [Unreleased]`.
6. Open a pull request and fill in the template.

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `docs:`, `test:`, `ci:`, `build:`, `chore:`, `refactor:`, `perf:`. Mark breaking changes with `!` (`feat!: ...`) and a `BREAKING CHANGE:` footer.

### What CI checks

Every push and pull request runs [.github/workflows/ci.yml](.github/workflows/ci.yml):

| Check | Fails when |
| --- | --- |
| ESLint | any error, or more warnings than the cap in the `lint` script |
| TypeScript | any type error |
| Jest | a test fails or coverage drops below the floors in [jest.config.ts](jest.config.ts) |
| `dist/` sync | the committed `dist/` differs from a fresh build |
| Size budget | a bundle exceeds its gzipped budget in [scripts/size-check.js](scripts/size-check.js) |
| publint + are-the-types-wrong | `package.json` exports or type declarations are wrong for any resolver |
| Smoke test | the packed tarball cannot be installed and rendered (ESM and CJS) with React 18.0.0 and latest 18.x |
| Node matrix | tests fail on a supported Node.js LTS line |
| Dependency review | a PR adds a dependency with a known high-severity vulnerability |
| CodeQL | static analysis finds a security issue |

## AI-assisted contributions

AI coding assistants are welcome here. [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md) exist so they have the same context a human contributor would. The rules:

- **You are the author.** You are responsible for every line you submit, whoever or whatever typed it. Read and understand the diff before opening a PR, and be ready to explain it in review.
- **Disclose substantial use.** Tick the AI-assistance box in the PR template and say briefly what the tool did (for example "generated the test scaffolding" or "drafted the fix, reviewed and adjusted by me"). Autocomplete-level help doesn't need disclosure.
- **Verify, don't trust.** Run `npm run validate` yourself. Don't submit tests you haven't seen fail without your change, and don't submit code that references APIs you haven't confirmed exist.
- **Keep PRs focused.** Don't include unrelated "improvements" an assistant made along the way, such as reformatting, renames or dependency bumps.
- **No unattended agents.** Don't open PRs or issues from autonomous agents without a human reviewing them first. Low-effort, unreviewed AI-generated PRs and issues will be closed.
- **Respect licensing.** Don't submit code reproduced from sources whose license is incompatible with MIT.

## Releasing

Maintainers only. Releases are published from CI with [npm provenance](https://docs.npmjs.com/generating-provenance-statements) via [trusted publishing](https://docs.npmjs.com/trusted-publishers), so no npm token is stored in the repository.

1. Make sure `main` is green and CHANGELOG `## [Unreleased]` describes the release. Pick the version bump using the compatibility contract in [AGENTS.md](AGENTS.md#compatibility-contract-semver). The `/release-check` Claude Code skill automates this review.
2. Move the Unreleased entries under a new version heading, then:

   ```bash
   npm version patch --no-git-tag-version   # or minor / major
   git commit -am "chore(release): v1.2.3"
   git tag v1.2.3
   git push origin main v1.2.3
   ```

3. The [release workflow](.github/workflows/release.yml) re-runs the full CI suite, checks the tag matches `package.json`, runs `prepublishOnly` (`npm run validate`), publishes to npm with provenance and creates a GitHub Release with generated notes.

To rehearse without publishing, run the **Release** workflow manually from the Actions tab with **dry-run** checked.

One-time setup:

- On npmjs.com, open the package settings, add a **Trusted Publisher** (GitHub Actions, repository `izaccavalheiro/virtualization`, workflow `release.yml`, environment `npm`), then set publishing access to require 2FA and disallow tokens.
- In the GitHub repository settings, create the `npm` environment, optionally with required reviewers so each publish needs approval.
