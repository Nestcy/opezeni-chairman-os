import { PALETTE } from "@/lib/palette";

export function Logo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="opezeni-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PALETTE.terracotta} />
          <stop offset="100%" stopColor={PALETTE.sand} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeOpacity="0.16" />
      <circle cx="12" cy="12" r="3.2" fill="url(#opezeni-mark)" />
      <circle
        cx="12"
        cy="12"
        r="6.2"
        fill="none"
        stroke={PALETTE.terracotta}
        strokeOpacity="0.45"
      />
      <circle cx="12" cy="1.5" r="1.5" fill={PALETTE.terracotta} fillOpacity="0.85" />
      <circle cx="21.4" cy="17" r="1.3" fill={PALETTE.sand} fillOpacity="0.7" />
      <circle cx="2.6" cy="17" r="1.3" fill={PALETTE.sand} fillOpacity="0.7" />
    </svg>
  );
}
