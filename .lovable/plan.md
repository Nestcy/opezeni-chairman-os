## Goal

The home page currently opens with the film. You want it to open with the headline you selected, then cut to the founder on the beach, then zoom into his phone and land in the Opezeni console.

## New order at the top of the page

```text
1. Headline block      "Run your software company without running it."
                       badge + subline + Experience Opezeni / Book Discovery Call
2. The film            golden-hour beach cafe, founder sipping a coconut, no laptop
3. The notification     phone lights up on the table, notification stack types in,
                       he picks it up (phone lifts and squares to camera)
4. The zoom             phone scales toward the viewer until the screen fills the frame
5. The dashboard        phone chrome peels away, screen becomes the live console,
                       which then unsticks and continues as the normal page
```

## What changes

- **Headline moves out of the dashboard section.** The hero text block becomes its own opening screen at the very top — full viewport height, centered, ambient grid behind it, with a quiet scroll cue at the bottom. No console under it anymore.
- **The film section moves below it** and keeps its own scroll stage. The opening caption ("The company is running. He isn't.") stays with the film, not with the headline.
- **A new beat: picking up the phone.** Right now the phone just grows. It will first sit low and slightly tilted on the table while notifications arrive, then lift, straighten, and center — reading as him picking it up — before the zoom begins.
- **The zoom ends in the real console.** The phone screen cross-dissolves into the full live dashboard (metrics, sparklines, agent status, activity stream) at the same corner radius, then the bezel fades and the console becomes the ordinary hero-sized section that scrolls on into Chapter 1.
- **The dashboard section keeps everything except the headline** — the console panel stays exactly as it is today, just without duplicated hero copy above it.
- Reduced-motion visitors get: headline → still poster with the notification stack → console, no scroll choreography.

## Technical notes

- New `HeroIntro` component holds the headline block lifted out of `HeroDashboard`; `HeroDashboard` gets a `bare` mode that renders only the console panel.
- `CinematicOpening` gains the pick-up beat: additional `useTransform` ranges on the existing single scroll progress driving phone `y`, `rotate`, and `scale` before the current width/height growth range, so there's still one scroll authority.
- The final console inside the phone reuses the real `HeroDashboard` console markup rather than the simplified `ConsoleScreen` mock, so the handoff at full-bleed is pixel-continuous.
- `src/routes/index.tsx` order becomes `HeroIntro → CinematicOpening → HeroDashboard → ThinkSection → …`.
- No new dependencies; existing video and poster assets are reused.
