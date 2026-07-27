export function Logo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeOpacity="0.18" />
      <circle cx="12" cy="12" r="3.2" fill="#3B82F6" />
      <circle cx="12" cy="12" r="6.2" fill="none" stroke="#3B82F6" strokeOpacity="0.5" />
      <circle cx="12" cy="1.5" r="1.5" fill="#3B82F6" fillOpacity="0.85" />
      <circle cx="21.4" cy="17" r="1.3" fill="#9BA3AF" />
      <circle cx="2.6" cy="17" r="1.3" fill="#9BA3AF" />
    </svg>
  );
}
