---
# memorialdaycountdown.com-ia42
title: Refresh repo tooling and evaluate against modern-web-guidance
status: completed
type: task
priority: normal
created_at: 2026-08-13T22:01:01Z
updated_at: 2026-08-14T08:14:36Z
---

Bring the repo up to the current standard tooling setup, then evaluate index.html/css/js against modern-web-guidance.

## Todo
- [x] Audit current tooling state (oxfmt/oxlint pinned, lint guard, vnu)
- [x] Install secrets-commit-guard repo-locally
- [x] Install update-docs-before-commit guard
- [x] Verify gates fire
- [x] Evaluate site with modern-web-guidance
- [x] Report findings / file follow-up beans

## Summary of Changes

Tooling was already current: oxfmt 0.63.0 + oxlint 1.78.0 pinned exact (both the latest published), repo-local lint guard at .git/hooks/pre-commit.d/30-lint-guard, vnu wired with a .vnu-filter, global hooks dispatcher active. lint, format:check, and vnu all pass clean.

Added two repo-local commit gates and proved each blocks before trusting it:

- 10-secrets-guard — blocks a staged credential (verified: a quoted api_key literal exits 1; the AWS docs example key is correctly cleared by the placeholder allowlist).
- 20-docs-guard — blocks a code-only commit (verified: staging a js/ change with no docs exits 1).

Evaluated index.html / css/main.css / js/*.js against modern-web-guidance (dark-mode, css, html, individual-transform-properties, fluid-scaling) plus the house web/html/css/js rules. Findings reported in chat; no site code changed. Follow-up beans deferred pending which findings get picked up.
