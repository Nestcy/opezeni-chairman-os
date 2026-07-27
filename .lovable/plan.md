## What's actually happening

I inspected the live preview. The video is there and *is* playing (readyState 4, not paused, currentTime advancing) — but you can't see it. Two separate causes:

1. **The video is rendered at `opacity-0`.** `Film()` only fades the video in when its `onPlaying` event fires. In practice the element starts playing before React's listener is attached (it autoplays during hydration), so the event is missed, `ready` stays `false`, and the poster image sits on top forever. Confirmed: the live element's class list still contains `opacity-0` while the video plays underneath.

2. **The preview reports `prefers-reduced-motion: reduce`.** In that branch the component renders `StaticOpening`, which is a poster image only — no video at all, no scroll choreography. So on any device/browser with reduced motion (including this preview environment), the hero is a literal static image by design.

## The fix

**A. Make the video reveal reliable (`src/components/site/CinematicOpening.tsx`)**
- Stop depending solely on `onPlaying`. On mount, check `video.readyState >= 2` (or `HAVE_FUTURE_DATA`) and mark it ready immediately; also listen to `loadeddata` and `canplay`, not just `playing`.
- Fail-safe: treat the video as ready once playback is attempted successfully, so the poster never becomes a permanent cover.
- Keep the poster strictly as a fade-out underlay for the first frames.

**B. Keep the film in reduced-motion mode**
- Change `StaticOpening` to render the same looping muted video instead of the still poster, just without the scroll-linked scale/blur/parallax choreography. Reduced motion means "no aggressive movement", not "no ambient video" — a slow ocean loop is fine, and it keeps the intended atmosphere for everyone.
- Optionally still fall back to the poster if the video errors or can't autoplay.

**C. Verify**
- Re-inspect the live element to confirm `opacity-100`, playback advancing, and no console errors.
- Screenshot the hero at scroll offsets 0 / mid / end to confirm the film → dashboard cross-dissolve still reads correctly.

No changes to the dashboard, copy, CTAs, or the rest of the page.
