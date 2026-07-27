## Opezeni — autonomous OS marketing experience

A dark-only, motion-heavy site where the landing page is the product demo. Built on this project's stack (React 19 + TanStack Start + Tailwind v4 + Framer Motion + Recharts + Lucide) — Next.js isn't available here, but every capability in the brief is covered.

### Design system (src/styles.css)
- Tokens in oklch equivalents of: bg `#05070A`, surface `#0D1117`, card `#161B22`, text `#F5F7FA` / `#9BA3AF`, accent blue `#3B82F6`, success `#22C55E`, warning `#F59E0B`, danger `#EF4444`, divider `rgba(255,255,255,.08)`.
- Fonts via `<link>` in `__root.tsx`: Space Grotesk (headlines), Inter (body), JetBrains Mono (data/labels).
- Glow, glass, and grid as named utilities so glow stays rare and intentional.
- Dark-only: `.dark` applied on `<html>`, no theme toggle.

### Global ambient layer
Fixed-position canvas/SVG behind everything: engineering grid drifting slowly, floating network nodes, animated connection lines, sparse particles. Respects `prefers-reduced-motion`.

### Routes
```text
/               immersive experience (all sections below)
/product        agent capabilities deep dive
/architecture   full animated system diagram
/about          Ernest Zimba story + philosophy
/book           discovery call + embedded calendar
```
Nav sections on `/` still deep-link; each route gets its own head() metadata.

### Home sequence
1. **Live dashboard hero** — full-viewport Opezeni console: Company Health (Revenue, MRR, Growth, Runway) with counting numbers and animating Recharts sparklines; six agent status cards (Marketing, Support, Hiring, Finance, Product, Analytics) with pulsing status lights; a scripted (non-random) activity feed pushing events like "Marketing Agent increased ROAS 18%". Headline + "See Opezeni Think" / "Book Discovery Call" overlay it.
2. **The Bottleneck** — scroll-linked: dashboard freezes, every agent flips to "Waiting…", arrows redirect into a single Founder node that glows red while a notification queue stacks up. Headline reveals on completion.
3. **The Transformation** — Founder lifts upward, Opezeni orchestrator node materializes, edges reroute, system turns green, queue clears. "Operator → Chairman" scale-in.
4. **Interactive company map** — SVG node graph (Founder, Marketing, Sales, Finance, Support, Hiring, Product, Analytics). Hover shows responsibilities; click expands into that department's demo.
5. **Department simulations** — six ~20s interactive state machines, no video: budget reallocation, runway forecast, ticket resolution, candidate ranking, roadmap prioritization, churn detection. Play/replay controls, animated charts and progress bars.
6. **Operator vs Chairman** — side-by-side animated comparison that reads before the copy does.
7. **Trust** — quote cards citing Paul Graham "Do Things That Don't Scale" and Musk's "Algorithm" as referenced ideas with attribution/links; no invented quotes.
8. **Architecture preview** — Founder → Orchestrator → agents → integrations (Slack, GitHub, Stripe, HubSpot, Linear, Notion, Google Ads, Meta Ads, CRM) with packets flowing along edges.
9. **About teaser** and **final CTA** — "Ready to stop operating your company?" with the booking embed.

### Microinteractions
Tilt-on-hover cards, magnetic cursor on primary CTAs, soft button glow, count-up numbers, redrawing charts, pulsing status lights, shrinking glass navbar on scroll, restrained glassmorphism.

### Quality
Responsive down to mobile (heavy simulations degrade to simplified static states), semantic HTML with a single H1 per route, alt text, keyboard-reachable nodes and demos, reduced-motion fallbacks, per-route SEO metadata and JSON-LD for the organization.

### Open item
The `/book` calendar is a styled placeholder embed until you give a Calendly (or similar) link — drop it in and I'll wire the real one.
