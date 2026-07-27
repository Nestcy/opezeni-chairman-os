## Goal
Re-skin the entire site to the new Opezeni identity: Instrument Serif + Work Sans typography, terracotta/amber-on-near-black palette, new gradients and 14px radius base. No layout or copy changes — tokens only, so every existing section inherits the new look.

## Fonts
- In `src/routes/__root.tsx`, replace the current Google Fonts `<link>` set with:
  - `Instrument Serif:ital,wght@0,400;1,400`
  - `Work Sans:wght@300;400;500;600;700`
  - keep the `preconnect` pair.
- In `src/styles.css` `@theme inline`:
  - `--font-display: "Instrument Serif", serif`
  - `--font-sans: "Work Sans", ui-sans-serif, system-ui, sans-serif`
  - `--font-mono`: keep JetBrains Mono only if it's still loaded; otherwise fall back to `ui-monospace` (mono is used for eyebrows/step labels).
- Base layer: `h1,h2,h3` get `letter-spacing: -0.02em; line-height: 1;` and Instrument Serif at weight 400.
- Update the `mono-label` utility to the new eyebrow style: Work Sans 600, `0.72rem`, uppercase, `letter-spacing: 0.22em`, `opacity: 0.6`. This keeps every existing `mono-label` / `SectionHeader` eyebrow on-spec without touching components.

## Color tokens (`src/styles.css`, `:root, .dark`)
| Token | Value |
| --- | --- |
| `--background` | oklch(0.10 0.012 40) — Near Black |
| `--surface` | oklch(0.135 0.015 40) — Rich Dark |
| `--card` / `--popover` | oklch(0.135 0.015 40) |
| `--foreground` / `*-foreground` | oklch(0.98 0.005 80) — Off White |
| `--primary` | oklch(0.43 0.15 38) — Terracotta |
| `--primary-hover` | oklch(0.49 0.16 42) — Amber Burnt |
| `--accent` | oklch(0.60 0.18 48) — Amber Hot |
| `--secondary` / `--muted` | oklch(0.22 0.05 40) — Deep Brown |
| `--muted-foreground` | cream-tinted mid tone derived from oklch(0.94 0.018 70) |
| `--sand` | oklch(0.94 0.018 70) — Cream |
| `--success` | oklch(0.58 0.20 145) — Green |
| `--warning` | Amber Hot |
| `--destructive` / `--danger` | Amber Burnt-leaning red |
| `--border` | `oklch(1 0 0 / 8%)` |
| `--input` | `oklch(1 0 0 / 12%)` |
| `--ring` | Terracotta |
| charts | terracotta → amber burnt → amber hot → cream → green |

Gradients:
- `--gradient-warm`: `linear-gradient(135deg, #9B2208, #B83A0A, #D95A1A)` (as oklch stops)
- `--gradient-charcoal`: `linear-gradient(180deg, #0A0705, #130C08)`

Radius: `--radius: 0.875rem` (the existing sm→4xl scale already derives from it).

## Canvas / SVG literals
`src/lib/palette.ts` holds raw hex used by the ambient grid canvas, Logo, CompanyMap and VisionNetwork. Update it to the new hexes (`background #0A0705`, `surface #130C08`, `cream #F5EDE4`, `terracotta #9B2208`, `terracottaDeep #B83A0A`, `sand #F5EDE4`, plus new `amberHot #D95A1A`, `green #2E9E3E`) and update the `RGBA` helpers to match, so the animated background and SVG motifs stay in sync.

## Verification
Build, then Playwright screenshots of `/`, `/about`, `/product`, `/architecture` and `/book` at desktop and mobile to confirm contrast (especially cream body text on near black, terracotta buttons) and that the serif headings sit correctly at the new tight line-height.

## Files
- edit: `src/styles.css`, `src/routes/__root.tsx`, `src/lib/palette.ts`
