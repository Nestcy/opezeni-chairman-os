import { motion } from "framer-motion";
import { useState } from "react";
import { DEPARTMENTS, type DeptId } from "@/lib/opezeni";
import { SectionHeader, Reveal } from "./primitives";
import { Logo } from "./Logo";

const POSITIONS: Record<string, { x: number; y: number }> = {
  founder: { x: 50, y: 8 },
  marketing: { x: 12, y: 36 },
  sales: { x: 30, y: 66 },
  finance: { x: 50, y: 86 },
  support: { x: 70, y: 66 },
  hiring: { x: 88, y: 36 },
  product: { x: 22, y: 14 },
  analytics: { x: 78, y: 14 },
};

const ORDER: DeptId[] = [
  "founder",
  "product",
  "analytics",
  "marketing",
  "hiring",
  "sales",
  "support",
  "finance",
];

export function CompanyMap({ onOpenDemo }: { onOpenDemo: (id: DeptId) => void }) {
  const [active, setActive] = useState<DeptId>("marketing");
  const activeDept = DEPARTMENTS.find((d) => d.id === active)!;

  return (
    <section className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="The company map"
          title="One orchestrator. Eight functions. Zero queues."
          subtitle="Hover a node to see what it owns. Open it to watch the agent actually work."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="glass relative aspect-[4/3] rounded-3xl p-4">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              {ORDER.filter((id) => id !== "founder").map((id) => (
                <line
                  key={id}
                  x1="50"
                  y1="50"
                  x2={POSITIONS[id].x}
                  y2={POSITIONS[id].y}
                  stroke={
                    active === id ? "rgba(59,130,246,0.65)" : "rgba(255,255,255,0.09)"
                  }
                  strokeWidth={active === id ? 0.5 : 0.28}
                />
              ))}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2={POSITIONS.founder.y}
                stroke="rgba(59,130,246,0.4)"
                strokeWidth={0.4}
              />
            </svg>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ boxShadow: ["0 0 24px -6px rgba(59,130,246,0.6)", "0 0 48px -6px rgba(59,130,246,0.35)", "0 0 24px -6px rgba(59,130,246,0.6)"] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-primary/40 bg-card px-4 py-3"
              >
                <Logo className="h-6 w-6" />
                <span className="font-display text-[11px] font-semibold">Orchestrator</span>
              </motion.div>
            </div>

            {ORDER.map((id) => {
              const d = DEPARTMENTS.find((x) => x.id === id)!;
              const p = POSITIONS[id];
              return (
                <button
                  key={id}
                  type="button"
                  onMouseEnter={() => setActive(id)}
                  onFocus={() => setActive(id)}
                  onClick={() => (id === "founder" ? setActive(id) : onOpenDemo(id))}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border px-2.5 py-2 text-[11px] transition-all ${
                    active === id
                      ? "border-primary/50 bg-card text-foreground glow-accent"
                      : "border-border bg-card/70 text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span className="flex items-center gap-1.5">
                    <d.icon className="h-3.5 w-3.5" aria-hidden />
                    {d.name.replace(" Agent", "")}
                  </span>
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-border bg-card/60 p-6">
            <div className="flex items-center gap-2">
              <activeDept.icon className="h-4 w-4 text-primary" aria-hidden />
              <h3 className="font-display text-lg font-semibold">{activeDept.name}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {activeDept.summary}
            </p>
            <ul className="mt-5 space-y-2">
              {activeDept.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span className="text-foreground/85">{r}</span>
                </li>
              ))}
            </ul>
            {activeDept.id !== "founder" && (
              <button
                type="button"
                onClick={() => onOpenDemo(activeDept.id)}
                className="mt-6 w-full rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/20"
              >
                Run the {activeDept.name.replace(" Agent", "")} simulation
              </button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
