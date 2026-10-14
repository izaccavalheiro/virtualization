---
name: release-check
description: Prepare a simple-virtualization release - classify the changes since the last tag as patch/minor/major against the compatibility contract in AGENTS.md, run the full validation, and draft the CHANGELOG entry. Use when the user asks to prepare, cut or check a release or version bump.
---

# Release check

Do not publish, tag or push. This skill prepares the release; the maintainer pushes the tag and the release workflow publishes.

1. Find the last release tag: `git describe --tags --abbrev=0` (if there are no tags, compare against the version on npm: `npm view simple-virtualization version`).
2. List changes since then: `git log --oneline <tag>..HEAD` and `git diff --stat <tag>..HEAD -- src package.json`.
3. Classify each change with the SemVer table in AGENTS.md ("Compatibility contract"). The release type is the highest one found. Call out anything ambiguous and explain the reasoning; when in doubt, choose the higher bump and ask.
4. Check the public surface did not change unintentionally: compare `dist/index.d.ts` at the tag against the working tree (`git diff <tag> -- dist/index.d.ts`). Any removed or narrowed export/prop means a major release.
5. Run `npm run validate` and `npm run test:smoke`, and confirm `git status --porcelain -- dist` is empty after the build. Report failures verbatim.
6. Move the `## [Unreleased]` entries in CHANGELOG.md under a new `## [x.y.z] - YYYY-MM-DD` heading and update the compare links at the bottom.
7. Tell the maintainer the exact commands to finish the release:

   ```bash
   npm version <patch|minor|major> --no-git-tag-version
   git commit -am "chore(release): vX.Y.Z"
   git tag vX.Y.Z && git push origin main vX.Y.Z
   ```
