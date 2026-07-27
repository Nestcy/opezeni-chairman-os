## Goal

Swap Opezeni's cold blue/green "AI startup" identity for a warm, timeless palette (charcoal, cream, terracotta, sand). No changes to information architecture, copy, layout, or user flow — purely visual identity and motion register.

## 1. Token layer (`src/styles.css`)

Rewrite the color tokens (still dark-only) to the specified palette, converted to OKLCH:

- background `#111111`, surface `#1A1A1A`, card slightly lifted charcoal
- foreground cream `#F7F3EC`, muted-foreground warm gray `#B8B0A4`
- primary terracotta `#C76B45`, hover/active deep terracotta `#A95636` (new `--primary-hover`)
- border/divider: soft sand `#DCCFC2` at ~10–12% opacity
- success muted sage `#708C69`, warning burnt amber `#C8923B`, danger a muted brick (not neon red)
- chart tokens: terracotta, sand, amber, sage, warm gray — no blues
- new `--gradient-warm` (terracotta → warm sand) and `--gradient-charcoal` (charcoal → deep terracotta)

Utility changes:
- `glow-accent` → replaced by `elevate-warm`: a soft shadow + hairline sand border instead of a neon halo. Keep the old class name aliased so no component breaks, but with the calm shadow values.
- Keep `glass` but lower the saturation boost and warm the tint.

Typography stays Space Grotesk / Inter / JetBrains Mono; increase heading letter-spacing slightly and lean on generous whitespace already present.

## 2. Hardcoded color cleanup

Files that hardcode `#3B82F6` / `rgba(59,130,246,…)` get switched to warm tokens:

- `Logo.tsx` — terracotta core, sand outer nodes, gradient fill on the inner ring (gradient reserved use).
- `AmbientBackground.tsx` — grid lines and node links in warm sand at low alpha; top radial wash becomes a very soft terracotta, notably dimmer than today.
- `HeroDashboard.tsx` — sparkline stroke/gradient to terracotta→transparent; delta text to sage.
- `CompanyMap.tsx` — connection strokes and active node in terracotta at reduced alpha; replace the pulsing boxShadow loop with a single static soft elevation plus a hover transition.
- `Architecture.tsx` — remove the infinite glow pulse; use a gentle opacity breathe or static elevation.
- `Simulations.tsx`, `SimulateCompany.tsx`, `OperatorChairman.tsx`, `ThinkSection.tsx`, `CinematicOpening.tsx` — status colors already reference `var(--success)` / `var(--danger)`, so they inherit the new palette; audit each for any remaining cool accents.

## 3. Buttons

Introduce two shared classes used consistently across `HeroIntro`, `Navbar`, `FinalCTA`, `about`, `SimulateCompany`, `book`:

- Primary: terracotta background (subtle terracotta→deep-terracotta gradient on hover), cream text, rounded-xl, soft elevation, 200ms ease transition, no glow.
- Secondary: transparent, cream hairline border, cream text, background lifts to 4% cream on hover.

## 4. Motion pass

- Remove or slow all infinite pulse loops (StatusDot ring, map/architecture glows) — StatusDot keeps a slow 3.5s low-opacity ripple in sage rather than a fast bright pulse.
- Lengthen reveal/scale durations slightly and soften easing; keep scroll choreography of `CinematicOpening` and `ThinkSection` intact.

## 5. Verify

Type-check, then Playwright screenshots of `/`, `/product`, `/architecture`, `/about`, `/book` (plus a mid-scroll capture of the cinematic sequence) to confirm every screen reads as one warm system with no leftover blue.

## Technical notes

All colors stay as semantic tokens in `src/styles.css`; components reference tokens, never raw hex, except inside SVG/canvas where a literal is unavoidable — those read from a small exported palette constant so there's one source of truth.
