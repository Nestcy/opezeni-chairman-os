Remove the live Opezeni console (`HeroDashboard`) from the opening sequence and simplify the hero to a pure film → headline handoff.

## What will change

1. **`src/components/site/CinematicOpening.tsx`**
   - Delete the `<HeroDashboard embedded />` call inside the scroll-driven `Stage`.
   - Delete the `<HeroDashboard />` call inside the reduced-motion `StaticOpening`.
   - Remove the now-unused `dashY`, `dashScale`, and `dashOpacity` scroll transforms.
   - Retune the remaining transforms so the experience still feels cinematic without the console:
     - Film holds full strength longer, then blurs/fades into the background.
     - Hero copy (headline, subheadline, CTAs) fades in earlier, around the middle of the scroll, since there is no console rising to wait for.
   - Keep the full-bleed looping video, scroll cue, and CTAs.

2. **`src/components/site/HeroDashboard.tsx`**
   - Delete the file. After the removals above it is no longer imported anywhere.

## Result

The homepage opening becomes a simpler cinematic sequence: the founder film plays full-screen, scrolls scale/blur into the background, and the headline/CTAs settle in. No live console rises from below.

## Verification

- Build the project to confirm no import errors.
- Preview the homepage and scroll through the hero to confirm the film, fade, and copy timing feel smooth.