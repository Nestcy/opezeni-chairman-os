/**
 * Single source of truth for raw color literals needed inside SVG / canvas,
 * where CSS custom properties are impractical. Mirrors the tokens in styles.css.
 */
export const PALETTE = {
  background: "#111111",
  surface: "#1A1A1A",
  cream: "#F7F3EC",
  warmGray: "#B8B0A4",
  terracotta: "#C76B45",
  terracottaDeep: "#A95636",
  sand: "#DCCFC2",
  sage: "#708C69",
  amber: "#C8923B",
} as const;

/** rgba() helpers for canvas strokes. */
export const RGBA = {
  terracotta: (a: number) => `rgba(199,107,69,${a})`,
  sand: (a: number) => `rgba(220,207,194,${a})`,
  warmGray: (a: number) => `rgba(184,176,164,${a})`,
};
