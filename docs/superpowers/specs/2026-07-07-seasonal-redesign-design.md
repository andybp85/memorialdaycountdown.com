# Seasonal Redesign — Design Spec

Two-theme redesign of memorialdaycountdown.com. Inspiration: 1920s Asbury Park boardwalk and
Boardwalk Empire. Status: proposed; mockups delivered for review.

## Concept: same boardwalk, two seasons

One illustrated Asbury Park boardwalk panorama — Ferris wheel, beach-pass pavilion, umbrellas,
the Atlantic — rendered twice:

- **Summer** (Memorial Day through Labor Day): daylight, turning Ferris wheel, striped umbrellas,
  gulls in the air, marquee bulbs lit and twinkling. Counts down to Labor Day ("season ends").
- **Off-season** (rest of the year): night, still wheel, boarded-up pavilion with a crooked
  "Closed for the Season" placard, furled umbrellas, gulls hunched on the railing, twinkling
  stars behind the scene, half the marquee bulbs out and one strip flickering. Counts down to
  Memorial Day.

Signature element: the countdown itself is a bulb-studded boardwalk marquee. Its state of repair
tells the season's story.

## Tokens

### Type

- Display and countdown: **Futura** (released 1927 — period-exact geometric sans; ships on
  macOS/iOS). Fallbacks: Century Gothic, Josefin Sans, Trebuchet MS.
- Sign fine print: Didot/Georgia italic (painted-sign flourish).
- All-caps display with wide tracking (`.12em`–`.34em`) for the deco signage voice.

### Summer palette

| Token | Hex | Use |
| --- | --- | --- |
| sky | `#8fd0ce` | page background |
| sea | `#2e8b84` | ocean, umbrella |
| sand | `#efdcb0` | beach |
| cream | `#faf3e0` | sign panels, awning stripe |
| cabana | `#ce4a38` | awning stripe, roof, umbrella |
| gold | `#e8a93c` | sunburst, marquee label |
| ink | `#16324a` | lettering, linework, marquee |

### Off-season palette

Same roles, weathered: dusk navy `#101b26`→`#22303d`, slate sea `#37474f`, faded cream
`#d8d1bf`, faded red `#7e4038`, tarnished gold `#b3893d`, boardwalk brown `#4c3b2a`.

## Layout (both themes)

1. Striped scalloped awning (full-bleed header)
2. Eyebrow: "Asbury Park, N.J. · Est. 1871 · On the Boardwalk"
3. Cream painted-sign panel with double rule; deco sunburst fan rising behind it
4. Marquee countdown (bulb rows top and bottom)
5. One-line secondary date fact
6. Full-width SVG boardwalk panorama (all illustration inline SVG, no image assets)
7. Boardwalk-plank footer with dashed-border ticket stub

## Motion

Summer: Ferris wheel rotates (48s), waves drift, bulbs twinkle. Off-season: stars twinkle in
two offset phases behind the content, waves drift faster (winter chop), one bulb strip flickers
irregularly; the wheel is still — its stillness is the point. All animation disabled under
`prefers-reduced-motion`.

## Behavior

- Memorial Day = last Monday of May; Labor Day = first Monday of September (computed, never
  hardcoded — already fixed in `js/countdown.js`).
- Theme selection by date: Memorial Day ≤ today < day after Labor Day → summer; else off-season.
  Single page; CSS custom properties swapped via a `data-season` attribute on `<html>`; the two
  panorama variants toggled the same way.
- Summer counts down to Labor Day with a "Memorial Day returns <date>" footnote; off-season
  counts down to Memorial Day. (Approved 2026-07-07.)
- No dependencies, no build step, no web-font downloads. System Futura carries the period look.

## Accessibility and quality floor

- Panoramas are `role="img"` with descriptive labels; ornaments are `aria-hidden`.
- Countdown values zero-padded to prevent layout jitter; `tabular-nums`.
- `color-scheme` meta per theme; theme-color matches each palette.
- Responsive to 390px and below (clock reflows to a 2×2 grid).

## Testing

- Date math: unit-check `lastMondayOfMay`/`firstMondayOfSeptember` against known years
  (2026: May 25 / Sep 7; 2027: May 31 / Sep 6).
- Season boundary behavior on Memorial Day and the day after Labor Day.
- Visual check at 1440px and 390px in both themes; reduced-motion pass.
