Remove the centered static phone frame (`<div className="h-[440px] w-[248px]..." />`) from the `StaticOpening` reduced-motion fallback in `src/components/site/CinematicOpening.tsx`. The fallback will then show only the cinematic beach poster with the gradient overlay, matching the clean "headline → film → dashboard" sequence and avoiding a disconnected blank phone shape.

**Files to change:**
- `src/components/site/CinematicOpening.tsx`

**Steps:**
1. Delete the phone frame div at lines 285-287 inside `StaticOpening`.
2. Verify the remaining fallback still renders a full-width cinematic section.
3. Run type-check and capture a screenshot of the reduced-motion / top-of-page state.