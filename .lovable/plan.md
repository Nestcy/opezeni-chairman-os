## Add Founder Contact to Footer

Update `src/components/site/Footer.tsx` to include Ernest Zimba’s contact details alongside the existing nav.

### What will change
- Add a new contact column/section in the footer with:
  - **Email:** nestcy770@gmail.com (mailto link)
  - **Phone:** +260973732409 / 0767918627 (tel link)
  - **LinkedIn:** https://www.linkedin.com/in/ernest-zimba-904661318/... (external link)
  - **X:** Ernest Zimba (@ernestzimba__) / X (external link to X profile)
- Use Lucide icons (`Mail`, `Phone`, `Linkedin`, `Twitter` or `X` alias) for visual scannability.
- Keep the existing premium industrial aesthetic: muted text, hover to cream/terracotta, no hardcoded colors.
- Ensure external links open in a new tab with `rel="noopener noreferrer"` and use semantic `a` tags (not `Link`) for mail/tel/external URLs.
- Maintain responsive layout so the footer still stacks cleanly on mobile.

### Files to edit
- `src/components/site/Footer.tsx`

### No new dependencies
Lucide icons are already used elsewhere in the project.