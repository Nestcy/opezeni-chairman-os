/**
 * Single source of truth for raw color literals needed inside SVG / canvas,
 * where CSS custom properties are impractical. Mirrors the tokens in styles.css.
 */
export const PALETTE = {
  background: "#0A0705",
  surface: "#130C08",
  cream: "#F5EDE4",
  warmGray: "#A9998C",
  terracotta: "#9B2208",
  terracottaDeep: "#B83A0A",
  amberHot: "#D95A1A",
  sand: "#F5EDE4",
  sage: "#2E9E3E",
  green: "#2E9E3E",
  amber: "#D95A1A",
} as const;

/** rgba() helpers for canvas strokes. */
export const RGBA = {
  terracotta: (a: number) => `rgba(155,34,8,${a})`,
  amberHot: (a: number) => `rgba(217,90,26,${a})`,
  sand: (a: number) => `rgba(245,237,228,${a})`,
  warmGray: (a: number) => `rgba(169,153,140,${a})`,
};
