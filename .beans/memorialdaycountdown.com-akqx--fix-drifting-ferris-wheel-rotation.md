---
# memorialdaycountdown.com-akqx
title: Fix drifting Ferris wheel rotation
status: completed
type: bug
priority: normal
created_at: 2026-07-08T00:35:21Z
updated_at: 2026-07-08T00:58:55Z
---

Wheel spokes drift off the hub during the CSS spin animation in Firefox.

Root cause: the counter-rotating gondola children perturb the .wheel-rotor group's fill-box each frame, so transform-origin: center (fill-box) wanders. Fix: add an invisible symmetric anchor circle to pin the group bounding box.

- [x] Reproduce drift (live, Firefox)
- [x] Diagnose fill-box pivot recompute from animated children
- [x] Add invisible anchor, verify Firefox + Chromium

## Summary of Changes
Added an invisible circle (fill=none stroke=none r=130) as the first child of .wheel-rotor. Its static symmetric geometry fixes the group's bounding box, so the CSS spin's fill-box transform-origin: center stays on the hub instead of drifting as the gondolas counter-rotate. Verified live in Firefox and Chromium via Playwright.

## Reopened 2026-07-07

User reports rotor still comes unglued from hub after ~1 minute of continuous animation. Prior anchor-circle fix insufficient over long runs. Investigating root cause.

- [x] Reproduce drift over 60+ s run (Firefox headless, 100 s probe: rotor bbox swells 260→274, origin wanders, center off hub ±9 px; seats visibly tilted)
- [x] Identify root cause: anchor circle only pinned the rotor's bbox. Firefox also recomputes each *gondola's* fill-box origin per frame; the seats swing outward past the r=130 anchor, inflating the rotor bbox again. Two-level feedback loop. Real fix: no fill-box anywhere — rotate about static user-space origins (rotor already at hub via parent translate; seats get translate wrappers at rim points).
- [x] Fix + verify long-run stability (120 s probes, Firefox + Chromium: max deviation 0.01 px, origin static; focus/visibility cycling clean)

## Summary of Changes (reopen)

Anchor circle removed; the real fix drops transform-box: fill-box entirely. The rotor spins about its local user-space origin (already the hub via the parent translate(210 170)); each seat rect now sits centered at (0,0) inside a translate wrapper at its rim point, so the counter-spin also turns about a static origin. Firefox recomputes fill-box origins every animation frame — the counter-rotating seats perturbed their own boxes and the rotor's, a two-level feedback loop the anchor only partially damped. Verified 120 s in Firefox and Chromium plus visibility-cycling: pivots static, seats upright.
