## Goal

Turn the top of the home page into one continuous cinematic journey: full-bleed founder video → scroll-linked dissolve → live dashboard rises into place → hero copy fades in over it.

## What changes

**1. Use the uploaded film**
- Upload `Founder_sipping_tea_at_cafe_202607270927.mp4` to the CDN as `src/assets/founder-cafe.mp4.asset.json`.
- Generate a matching first-frame poster so there's no black flash before playback.
- Video plays autoplay, muted, looped, `playsInline`, `object-cover`, full viewport. Nothing on top of it at scroll 0 — no headline, no caption, just a faint scroll cue at the bottom.

**2. Rebuild the opening as one scroll stage**
Rewrite `CinematicOpening.tsx` into a single sticky stage (~250vh scroll track) that owns the whole sequence. The phone prop, pick-up beat, bezel and outro caption are removed.

```text
scroll 0.00 ──────────── video only, calm, untouched
scroll 0.15 ──────────── scroll cue fades
scroll 0.20–0.65 ─────── video scales 1.0 → 1.12, blur 0 → 18px,
                         brightness dips, opacity 1 → 0.25 (never a hard cut)
scroll 0.35–0.75 ─────── dashboard slides up from below (y 24vh → 0),
                         scale 0.94 → 1, opacity 0 → 1
scroll 0.70–0.90 ─────── headline / sub / CTAs fade + rise in above dashboard
scroll 1.00 ──────────── dashboard locked in viewport, page releases to next section
```
All values via `useTransform` on a single scroll progress value (same rAF listener already in the file), so the two layers cross-dissolve with no gap.

**3. Hero content moves inside the stage**
- `HeroIntro.tsx` is removed from the page as a standalone top section; its copy (headline "Run your software company without running it.", sub "The autonomous operating system for SaaS founders.", CTAs **Experience Opezeni** + **Book Discovery Call**) is rendered inside the stage and fades in only once the dashboard is in place.
- CTA targets stay as today (`#think` and `/book`).

**4. Real, interactive dashboard**
The stage renders the actual `HeroDashboard` panel (not the simplified console mock), so it is live and explorable the moment it appears. `HeroDashboard` gets a small prop to drop its own entrance animation and outer section padding when it's rendered inside the stage. `index.tsx` no longer renders it separately.

**5. Reduced motion / fallback**
`prefers-reduced-motion`: static poster frame, then the dashboard and hero copy shown normally, no scroll choreography. Poster image also covers slow connections.

## Technical notes
- Files touched: `CinematicOpening.tsx` (rewrite), `HeroDashboard.tsx` (props for embedded mode), `routes/index.tsx` (remove `HeroIntro` + standalone `HeroDashboard`), `HeroIntro.tsx` deleted, new asset pointers.
- Old `opening-scene.mp4` / `opening-poster.jpg` asset pointers are left in place unless you want them deleted.
- Verify with typecheck plus Playwright screenshots at several scroll offsets to confirm no dead zones or double-render gaps.
