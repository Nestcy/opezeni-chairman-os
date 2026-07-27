## Goal

Replace the current About page with a founder page that answers one question: why Ernest Zimba is the right person to build Opezeni. Direct, technical, no hype, generous whitespace, dark theme matching the rest of the site.

## Page structure

**Hero + Section 1 — Why Opezeni exists**
- Eyebrow, one large headline, then short paragraphs: self-taught AI/ML engineer in Lusaka, Zambia; started building agentic systems in 2026; Opezeni grew out of a startup stress-test agent; the question that reframed everything ("what happens to a SaaS founder's job once AI can decide, not just automate?"), leading into the mission.
- Subtle duotone-treated portrait (your uploaded photo) at small size beside the intro, with a monospace caption line (name / role / location). Treated to read as engineered, not stock photography — muted, blue-tinted, soft border, no drop shadow.

**Section 2 — Operating principles**
Three cards, numbered in mono, each with a bold headline and a short explanation:
1. Automate last, not first.
2. Validate before you build.
3. Founders should design the future, not operate the present. (ties back to Opezeni)

**Section 3 — Track record**
Vertical timeline with a thin connector line and three entries, stated plainly:
- IBM Professional Certificates — Agentic AI, RAG, Deep Learning (Coursera)
- LangGraph-based Startup Stress-Test Agent, FastAPI, human-in-the-loop workflows — built and deployed
- CogniMerse and AethraSync — two prior AI startups, framed as learning cycles that produced the validation-first philosophy, not as failures

**Section 4 — The long-term vision**
Full-bleed closing panel, headline "I'm not building another AI tool.", then the on-prem-to-cloud analogy, assist vs operate, operator to chairman. Ends with the CTA line "Book a discovery call to explore whether Opezeni fits your company." linking to /book.

## Design and motion

- Reuses existing tokens and primitives (`Reveal`, `TiltCard`, mono-label, glass) — no new colors.
- One new lightweight SVG graphic: an abstract network/architecture motif behind the vision section (nodes converging on a single decision layer), static with a very slow opacity drift only.
- Motion limited to fade-and-rise on scroll and the timeline line drawing in once. No parallax, no hover theatrics.
- Existing generic `FinalCTA` block is dropped from this page since section 4 carries its own CTA.

## Technical notes

- Rewrites `src/routes/about.tsx`; adds a small `src/components/site/FounderTimeline.tsx` and a network SVG component if the file gets long.
- Portrait uploaded via `lovable-assets` and referenced through an `.asset.json` pointer, with duotone applied in CSS (no binary committed to the repo).
- Route `head()` title/description updated to match the new positioning.
