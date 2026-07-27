## Goal
Adopt LEANSpark's typographic system — its fluid type scale, weights, line-heights and letter-spacing — while keeping Instrument Serif (display) and Work Sans (body). No colour, layout or copy changes.

## What LEANSpark actually uses (read from its live stylesheet)
- Headings: serif, weight 400, `line-height: 1.1`, `letter-spacing: -0.02em` (hero `1.04`).
- Body: sans, weight 400, `line-height: 1.65`, base size fluid.
- Fluid scale via `clamp()`:

```text
--text-xs    clamp(0.6875rem, 0.65rem + 0.2vw, 0.75rem)
--text-sm    clamp(0.8125rem, 0.78rem + 0.2vw, 0.875rem)
--text-base  clamp(0.9375rem, 0.9rem  + 0.2vw, 1rem)
--text-lg    clamp(1.0625rem, 1rem    + 0.3vw, 1.125rem)
--text-xl    clamp(1.25rem,   1.1rem  + 0.75vw, 1.5rem)
--text-2xl   clamp(1.75rem,   1.5rem  + 1.25vw, 2.25rem)
--text-3xl   clamp(2.25rem,   1.75rem + 2.5vw,  3rem)
--text-hero  clamp(2.75rem,   2rem    + 3.75vw, 4rem)
```
- Element defaults: `h1` = hero, `h2` = 2xl, `h3` = xl, `h4` = xl/500; lead paragraphs = lg at `line-height 1.6`.
- Eyebrow/kicker: very small (10–12px), `letter-spacing` ~0.07–0.22em, uppercase.

## Changes — `src/styles.css` only
1. **Register the scale in `@theme`** as `--text-xs` … `--text-4xl`, mapping the clamps above onto Tailwind's existing size names, plus a new `--text-hero`. This makes `text-2xl`, `text-3xl`, etc. fluid site-wide, so every existing component picks it up without edits. Add matching `--text-*--line-height` values (1.1 for the large display sizes, 1.6–1.65 for body sizes) so line-height travels with the size.
2. **Base layer headings**: change the current `line-height: 1` to LEANSpark's `1.1` (`1.04` for `h1`), keep `letter-spacing: -0.02em`, weight 400. The current `1` is too tight for Instrument Serif at card-title sizes; `1.1` fixes the cramped look while matching LEANSpark.
3. **Base layer body**: `line-height: 1.65`, `font-size: var(--text-base)`, weight 400.
4. **Default element sizes** in the base layer: `h1 → text-hero`, `h2 → 2xl`, `h3 → xl`, so headings that carry no explicit Tailwind size class land on the LEANSpark scale.
5. **`mono-label` (eyebrow)**: tighten to LEANSpark proportions — `font-size: var(--text-xs)`, weight 600, uppercase, `letter-spacing: 0.22em`, opacity 60%.

## Component touch-ups
Several sections hardcode sizes that now conflict with the fluid scale (e.g. `text-[15px]`, `text-4xl sm:text-5xl` on hero/CTA headlines in `CinematicOpening.tsx`, `FinalCTA.tsx`, `DiscoveryProcess.tsx`, `primitives.tsx` `SectionHeader`). I'll replace those with the scale tokens (`text-hero`, `text-3xl`, `text-lg`, `text-base`) and drop the now-redundant responsive size pairs, since the clamps handle mobile→desktop themselves.

## Verification
Build, then Playwright screenshots of `/`, `/about`, `/product`, `/architecture`, `/book` at 1280px and 390px to confirm headings scale smoothly and no line-height regressions.

## Files
- edit: `src/styles.css`
- edit (size-class cleanup): `src/components/site/primitives.tsx`, `CinematicOpening.tsx`, `FinalCTA.tsx`, `DiscoveryProcess.tsx`, and any other section using hardcoded px text sizes
