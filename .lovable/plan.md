## Problem

The "Experience Opezeni" and "Book Discovery Call" CTAs live inside `CinematicOpening`. `CinematicOpening` and `ThinkSection` both use `z-10`, and because `ThinkSection` appears later in the DOM it stacks on top. The ThinkSection glass card therefore hides the hero CTAs during the handoff at the bottom of the cinematic scroll.

## Plan

1. **Restack the hero section above ThinkSection**
   - In `src/components/site/CinematicOpening.tsx`, change the outer `<section>` from `z-10` to `z-20`.
   - Keep `ThinkSection` at `z-10` so it sits below the hero while the hero is active, then becomes the active layer once the hero scrolls away.

2. **Verify the reduced-motion fallback**
   - In `StaticOpening`, the CTAs are already rendered after the film section, so no overlap exists there. No change needed unless the same z-index conflict appears in that path.

3. **Test the scroll handoff**
   - Scroll through the hero on desktop and mobile viewports.
   - Confirm the CTAs remain visible and clickable until the cinematic section ends.
   - Confirm ThinkSection content is not clipped or visually broken after the hero passes.

## Files to change
- `src/components/site/CinematicOpening.tsx` — raise hero section z-index.

## Validation
- Build passes.
- Preview shows CTAs clearly at the end of the hero scroll.
- ThinkSection scrolls into view cleanly without covering the hero CTAs.