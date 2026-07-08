---
# memorialdaycountdown.com-akqx
title: Fix drifting Ferris wheel rotation
status: completed
type: bug
priority: normal
created_at: 2026-07-08T00:35:21Z
updated_at: 2026-07-08T00:36:27Z
---

Wheel spokes drift off the hub during the CSS spin animation in Firefox.

Root cause: the counter-rotating gondola children perturb the .wheel-rotor group's fill-box each frame, so transform-origin: center (fill-box) wanders. Fix: add an invisible symmetric anchor circle to pin the group bounding box.

- [x] Reproduce drift (live, Firefox)
- [x] Diagnose fill-box pivot recompute from animated children
- [x] Add invisible anchor, verify Firefox + Chromium

## Summary of Changes
Added an invisible circle (fill=none stroke=none r=130) as the first child of .wheel-rotor. Its static symmetric geometry fixes the group's bounding box, so the CSS spin's fill-box transform-origin: center stays on the hub instead of drifting as the gondolas counter-rotate. Verified live in Firefox and Chromium via Playwright.
