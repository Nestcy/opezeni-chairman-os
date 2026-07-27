## Problem
The `ThinkSection` glass card is visually crowding the bottom of the cinematic hero, making the “Experience Opezeni” and “Book Discovery Call” buttons feel blocked or cramped even after the z-index fix.

## Plan
Tighten the `ThinkSection` component without removing its narrative or animations, and shorten its scroll track so the hero CTAs have clear breathing room.

### 1. Shrink the diagram canvas
- Lower the SVG container height from `h-[340px] sm:h-[400px]` to `h-[280px] sm:h-[320px]`.

### 2. Tighten spacing
- Reduce the glass card padding from `p-5 sm:p-8` to `p-4 sm:p-6`.
- Reduce the inner grid gap from `gap-8` to `gap-6`.

### 3. Compress the copy block
- Lower the `min-h-[180px]` on the right-side text block.
- Tighten headline/paragraph spacing so the text doesn’t force extra height.

### 4. Shorten the scroll track
- Reduce the section height from `h-[320vh]` to `h-[280vh]` so `ThinkSection` starts and ends sooner, leaving more room for the hero CTAs.

### 5. Verify
- Check the live preview at the scroll position where the hero CTAs sit to confirm they remain fully visible and clickable on both desktop and mobile.

## Files to edit
- `src/components/site/ThinkSection.tsx`
- `src/routes/index.tsx` (scroll-track height only if needed)

## Outcome
The same bottleneck-to-orchestrator narrative stays intact, but the section takes up less vertical real estate and no longer visually blocks the hero CTAs.