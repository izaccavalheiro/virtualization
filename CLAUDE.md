# CLAUDE.md

@AGENTS.md

## Claude Code specifics

- Shared project permissions live in [.claude/settings.json](.claude/settings.json): `npm run` scripts are pre-approved; `npm publish`, `git push` and tagging are denied. Put personal overrides in `.claude/settings.local.json` (git-ignored).
- `/release-check` (project skill in [.claude/skills/release-check/](.claude/skills/release-check/SKILL.md)) walks through preparing a release and confirms the version bump type against the compatibility contract.
- Before finishing a task that touched `src/`, run `npm run validate` and rebuild `dist/`. Report the actual command output if anything fails; do not lower thresholds or the warning cap to get green.
