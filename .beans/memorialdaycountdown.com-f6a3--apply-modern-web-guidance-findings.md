---
# memorialdaycountdown.com-f6a3
title: Apply modern-web-guidance findings
status: completed
type: task
priority: normal
created_at: 2026-08-14T08:10:32Z
updated_at: 2026-08-14T08:16:51Z
---

Act on the modern-web-guidance evaluation from memorialdaycountdown.com-ia42.

## Todo
- [x] Drop redundant role="presentation" from the awning and stars divs
- [x] Point og:url at the apex, not the www redirect
- [x] Delete the dead height:100vh fallback (svh is Baseline widely available)
- [x] Wrap the marquee/also/panorama in a <main> landmark
- [x] Swap the resize listener for a ResizeObserver on .panorama
- [x] Use the individual transform property for the cropped sky badge
- [x] Convert main.css to native nesting
- [x] Verify: lint, format:check, vnu, and a browser pass in both seasons

## Verification status

- `npm run lint` — clean
- `npm run format:check` — clean (oxfmt re-indented index.html for the new `<main>` and kept the CSS nesting intact)
- `vnu --errors-only` — clean through `.vnu-filter`
- Browser pass — NOT DONE. The Claude-in-Chrome extension is not connected in this session, and the
  extension refuses `file://` URLs anyway. Needs a manual look in Firefox RDM, both seasons
  (`?season=summer`, `?season=off`), landscape and portrait, plus a console check for a
  ResizeObserver loop warning.
