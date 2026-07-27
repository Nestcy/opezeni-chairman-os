## What's wrong

Confirmed by request: the hero video path returns **200 on the Lovable domain** and **404 on www.opezeni.space**.

The video (and poster, portrait, etc.) are stored as Lovable CDN assets and referenced by a root-relative path:

```text
/__l5e/assets-v1/<id>/founder-cafe.mp4
```

That path only exists on Lovable's hosting layer. Vercel has no route for `/__l5e/...`, so it serves the SPA 404 HTML, the `<video>` fires `onError`, and `CinematicOpening` falls back to the poster — which also 404s, so you get a blank/dark hero.

## Fix

Resolve asset pointers through an absolute origin instead of a relative path.

1. Add `src/lib/asset.ts` with `assetUrl(pointer)` that returns `pointer.url` unchanged when running on a Lovable host, and prefixes the Lovable asset origin (`https://opezeni-chairman-os.lovable.app`) otherwise. Resolution stays SSR-safe by using a build-time env value rather than `window`.
2. Route every `.asset.json` consumer through it: `CinematicOpening.tsx` (video + poster), plus the other asset imports (`ernest-zimba.jpg`, `opening-poster.jpg`, `opening-scene.mp4`) wherever they're used.
3. Verify by re-fetching the resolved absolute URL and by loading the page.

### Alternative (say the word if you prefer it)

Copy the media into `public/` and reference `/founder-cafe.mp4` directly. Fully host-independent and no CDN dependency, but adds ~9 MB of binaries to the repo and to every Vercel deploy.

## Technical notes

- The CDN origin will be a `VITE_` env var with the Lovable URL as default, so you can repoint it later without code changes.
- No change to the scroll choreography, motion timings, or layout.
