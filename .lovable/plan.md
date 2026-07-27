## Goal
Add a premium "How the discovery process works" experience: a scroll-animated six-stage timeline, two fit-comparison cards, and a closing CTA — using the existing terracotta/cream design system and Framer Motion primitives.

## Placement
- New component `src/components/site/DiscoveryProcess.tsx` (timeline + fit cards + CTA).
- Rendered on `/book` (`src/routes/book.tsx`) directly below the calendar block, so it answers "what happens after I book?" at the exact moment of hesitation.
- Also rendered on the homepage (`src/routes/index.tsx`) between `Trust` and `Architecture`, so homepage visitors see the process before the final CTA. If you'd rather keep it on `/book` only, say so and I'll drop the homepage insertion.

## Timeline design
- Vertical rail with a scroll-linked progress line: a `useScroll`-driven `scaleY` gradient (terracotta → sand → transparent) that fills as the section scrolls, extending the pattern already used in `FounderTimeline`.
- Six stage cards, alternating emphasis on desktop, single column on mobile.
- Each stage node: numbered mono badge (`01`–`06`) with a soft terracotta ring that illuminates via `whileInView` (elevate-warm glow), plus a per-stage icon (PhoneCall, Network, FileText, ShieldCheck, Rocket, Crown from lucide).
- Card content: step label, title, optional duration chip ("20–30 min" on step 1), body copy, and bulleted lists with small terracotta markers. Bullets stagger in with `Reveal`-style delays.
- Content copy used verbatim from the request for all six stages.
- Respects `prefers-reduced-motion` by falling back to plain opacity reveals.

## Fit comparison
- Two cards below the timeline using `TiltCard`:
  - "Great Fit" — sage/success accent, check markers, 5 bullets.
  - "Probably Not a Fit" — muted/warning accent, x markers, 4 bullets.
- Equal-height grid, `glass` surface, subtle border-color shift on hover.

## Section CTA
- Centered headline "Ready to see what Opezeni could look like inside your company?"
- `MagneticButton` with `btn-primary` → links to `/book` (on the `/book` page it scrolls to the calendar instead of navigating).
- Muted secondary paragraph with the 20–30 minute / no-obligation copy.

## Technical notes
- Only semantic tokens (`primary`, `sand`, `success`, `warning`, `muted-foreground`) — no hardcoded colors.
- Reuses `Reveal`, `TiltCard`, `MagneticButton`, `SectionHeader` from `src/components/site/primitives.tsx`.
- Stage data lives in a typed const array inside the component file for easy copy edits.
- Section keeps `relative z-10` to match sibling sections and avoid the hero stacking issue fixed earlier.

## Files
- new: `src/components/site/DiscoveryProcess.tsx`
- edit: `src/routes/book.tsx`, `src/routes/index.tsx`

## Verification
Build the project and take Playwright screenshots at several scroll positions on desktop and mobile to confirm the progress line fills correctly and cards read cleanly.
