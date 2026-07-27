## Goal

The film should stay fully visible and sharp for most of the scroll, and only give way at the very end — right as the console locks into the viewport.

## Current behaviour (src/components/site/CinematicOpening.tsx, Stage)

The film starts degrading at 20% scroll progress and is nearly gone by 65%: opacity 1 → 0.25, blur 0 → 18px, brightness 1 → 0.45, plus a background veil ramping 0 → 0.75 from 25%. The console only finishes arriving at 75%. So the film disappears long before the console gets there — that early fade is what reads wrong.

## Change

Retime the film so it holds, then releases late:

- **Opacity**: hold at 1 until ~0.62, then 1 → 0 across 0.62 → 0.85 (finishing exactly as the console settles).
- **Blur / brightness**: keep the film sharp until ~0.6; only a light softening (blur 0 → 8px, brightness 1 → 0.7) over 0.6 → 0.85, so it's a recede rather than a smear.
- **Scale**: slow, continuous swell across the whole track (1 → 1.06 over 0 → 0.85) so there's always a sense of motion while it stays visible.
- **Veil**: start it at 0.6 instead of 0.25 and ramp to 1 by 0.88, so the background takes over only at the handoff.
- **Console**: bring `dashOpacity` in slightly later (0.6 → 0.8) so it doesn't cross-fade on top of a fully visible film; keep `dashY`/`dashScale` roughly as-is (0.55 → 0.88) so the rise and the film's exit resolve together.
- **Hero copy**: nudge to 0.85 → 1.0 so it lands after the console is settled.

Net effect: scroll and the film stays live and full-strength, subtly growing; only in the last third does it soften and dissolve as the console rises into place. No hard cut, no early fade.

## Verify

Screenshot the hero at scroll offsets ~0, 40%, 60%, 80%, 100% to confirm the film is still fully visible at 40–60% and cleanly handed off by 100%, and re-check the live preview for the video playing and no console errors.
