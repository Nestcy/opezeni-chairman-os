import { motion } from "framer-motion";

/** Abstract network motif: distributed nodes converging on a single decision layer. */
export function VisionNetwork({ className }: { className?: string }) {
  const nodes = [
    { x: 60, y: 40 },
    { x: 180, y: 26 },
    { x: 300, y: 52 },
    { x: 420, y: 30 },
    { x: 540, y: 48 },
    { x: 120, y: 110 },
    { x: 260, y: 124 },
    { x: 400, y: 112 },
    { x: 520, y: 126 },
  ];

  return (
    <motion.svg
      viewBox="0 0 600 260"
      fill="none"
      className={className}
      aria-hidden
      initial={{ opacity: 0.25 }}
      animate={{ opacity: [0.25, 0.45, 0.25] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    >
      {nodes.map((n, i) => (
        <path
          key={`l${i}`}
          d={`M${n.x} ${n.y} L300 200`}
          stroke="var(--primary)"
          strokeOpacity={0.18}
          strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={`n${i}`} cx={n.x} cy={n.y} r={2.5} fill="var(--primary)" fillOpacity={0.5} />
      ))}
      <rect
        x={228}
        y={188}
        width={144}
        height={24}
        rx={12}
        stroke="var(--primary)"
        strokeOpacity={0.4}
        fill="var(--primary)"
        fillOpacity={0.06}
      />
      <circle cx={300} cy={200} r={3.5} fill="var(--primary)" />
    </motion.svg>
  );
}
