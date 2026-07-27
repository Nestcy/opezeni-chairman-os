## Plan: Wire up the Cal.com booking embed

### Goal
Replace the styled placeholder on `/book` with Ernest's live Cal.com scheduling embed so visitors can book directly.

### Changes
1. **Install `@calcom/embed-react`** — Cal's official React embed for inline, theme-aware booking.
2. **Update `src/routes/book.tsx`**:
   - Replace the dashed "Scheduling" placeholder block with `<CalEmbed calLink="ernest-ho5gwm/problem-discovery-interview" />`.
   - Keep the left-side copy (headline, bullets, value prop) unchanged.
   - Style the embed container to match the dark glass aesthetic: rounded-2xl, dark theme, min-height for stability.
3. **Verify UX**:
   - Embed loads in dark mode to match the site.
   - Mobile layout remains a stacked single column.
   - No console errors from the embed script.

### Technical notes
- The embed will be lazy-loaded behind a small wrapper so it doesn't block initial render.
- We'll keep the existing route `head()` metadata.
- No backend or auth changes required.

### Acceptance criteria
- `/book` shows the live Cal.com booking UI instead of the placeholder.
- Page remains responsive and visually consistent with the rest of the site.
- Build passes with no type or lint errors.