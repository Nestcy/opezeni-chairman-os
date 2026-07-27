## What already exists

The site is built: hero dashboard, bottleneck/shift scroll narrative, company map, department simulations, operator→chairman, trust, architecture, About founder page, Cal.com booking. This plan adds the three missing pieces from the brief and tightens the copy.

## 1. Cinematic opening (new)

A scroll-driven film at the very top of the home page — it never blocks, never needs a skip button.

- Generate a golden-hour beach-café clip (founder relaxed, ocean, warm light, no laptop) as an AI video, uploaded to CDN so it doesn't bloat the repo. A generated still is used as the poster frame so the first paint is instant, and the clip is muted, autoplaying, and looping.
- Overlaid on the film: a phone that lights up with an Opezeni notification stack — ROAS +18%, 46 conversations resolved, runway forecast updated, final interview scheduled — typed in one at a time.
- Reduced-motion and slow-connection visitors get the still poster with the same notification stack, no video.

## 2. The seamless transition into the dashboard

- Scrolling scales and centers the phone until its screen fills the viewport; the film dims and desaturates behind it.
- At full-bleed, the phone's screen content cross-dissolves into the live console — same corner radius, same border, so the phone chrome peels away rather than cutting.
- The console then unsticks and becomes the normal hero section, with the headline "Run your software company without running it." and CTAs "Experience Opezeni" (jumps into the narrative) and "Book Discovery Call".

## 3. Simulate My Company (new section on the home page)

Placed after the department demos.

- Three questions: monthly recurring revenue, team size, biggest operational bottleneck. Sliders and a choice grid, one question per step.
- A reasoning sequence plays: mapping departments → finding bottlenecks → assigning AI agents → building operational model, each line resolving with a check.
- Result: a personalized console — their MRR and headcount drive the numbers, their named bottleneck is the agent that gets highlighted first, with estimated hours per week reclaimed and a runway/revenue projection. Ends with the discovery-call CTA.
- Everything runs in the browser from their inputs; no data is stored or sent anywhere.

## 4. Continuity pass

- Chapter copy checked against the brief ("Every decision flows through you." / "That's not a company. That's a bottleneck.").
- Nav gets a link to the simulator; home-page metadata unchanged.
- Ambient grid pauses behind the film so it doesn't compete with the footage.

## Technical notes

- New: `CinematicOpening.tsx`, `SimulateCompany.tsx`, plus a small `useSequenceProgress` helper; `HeroDashboard` gains a `phase` prop so it can render inside the phone screen and full-size.
- Video and poster go through `lovable-assets` (`.asset.json` pointers), never committed as binaries.
- Transition uses one `useScroll` range on a tall sticky stage — same pattern as the existing Think section — so there's a single scroll authority and no jank.
- Simulator state is local React; no backend, no new dependencies beyond what's installed.
