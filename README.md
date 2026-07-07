# How Long Until Memorial Day?

It's the day after Labor Day in New Jersey and this is catharsis.

A static one-page countdown styled after the 1920s Asbury Park boardwalk, live at
[memorialdaycountdown.com](https://www.memorialdaycountdown.com). The page dresses itself for
the season:

- **Summer** (Memorial Day through Labor Day): beach day — turning Ferris wheel, striped
  umbrellas, lit marquee. Counts down to the end of the season.
- **Off-season** (the rest of the year): night on the shuttered boardwalk — boarded-up pavilion,
  gulls on the railing, half the marquee bulbs out. Counts down to Memorial Day.

Memorial Day (last Monday of May) and Labor Day (first Monday of September) are computed, never
hardcoded. Preview either theme any day of the year with `?season=summer` or `?season=off`.

## Structure

- `index.html` — the page; all illustration is inline SVG
- `css/main.css` — off-season palette by default, summer palette via `html[data-season="summer"]`
- `js/season.js` — season logic; runs blocking in `<head>` so the right theme paints first
- `js/countdown.js` — ticks the marquee clock and flips the theme live at season boundaries

No build step, no dependencies, no web fonts (display face is Futura, released 1927 and shipped
with macOS/iOS). Serve the directory with any static server; root-relative asset paths mean
`file://` won't resolve them.

## Design

Spec and palette tokens: `docs/superpowers/specs/2026-07-07-seasonal-redesign-design.md`.
Tasks tracked with [Beans](https://github.com/hmans/beans) in `.beans/`.
