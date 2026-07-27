import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Crown, Bell } from "lucide-react";
import { useRef } from "react";
import { DEPARTMENTS } from "@/lib/opezeni";
import { Logo } from "./Logo";

const NODES = DEPARTMENTS.filter((d) =>
  ["marketing", "support", "finance", "hiring", "product"].includes(d.id),
);

const QUEUE = [
  "Approve ad budget change",
  "Refund request #4821",
  "Contractor invoice",
  "Interview slot confirmation",
  "Roadmap tie-breaker",
  "Pricing question from sales",
  "Churn escalation",
];

/**
 * Two scroll-linked acts on one sticky stage:
 * 1. The bottleneck — everything freezes and routes into the founder.
 * 2. The transformation — Opezeni takes the center, the system turns green.
 */
export function ThinkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="think" ref={ref} className="relative z-10 h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center px-4">
        <div className="mx-auto w-full max-w-5xl">
          <Stage progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  // act 1: 0 → 0.45 (bottleneck)   act 2: 0.55 → 1 (transformation)
  const founderGlow = useTransform(progress, [0.05, 0.4, 0.6], [0, 1, 0]);
  const founderY = useTransform(progress, [0.55, 0.78], [0, -140]);
  const orchestratorIn = useTransform(progress, [0.6, 0.8], [0, 1]);
  const green = useTransform(progress, [0.62, 0.85], [0, 1]);
  const queueOpacity = useTransform(progress, [0.1, 0.35, 0.6, 0.72], [0, 1, 1, 0]);
  const act1Text = useTransform(progress, [0.22, 0.34, 0.5, 0.56], [0, 1, 1, 0]);
  const act2Text = useTransform(progress, [0.8, 0.9], [0, 1]);
  const edgeColor = useTransform(green, (g) =>
    g > 0.5 ? "rgba(34,197,94,0.55)" : "rgba(239,68,68,0.45)",
  );
  const statusColor = useTransform(green, (g) =>
    g > 0.5 ? "var(--success)" : "var(--muted-foreground)",
  );
  const waitingOpacity = useTransform(green, [0, 1], [1, 0]);
  const orchestratorScale = useTransform(orchestratorIn, [0, 1], [0.7, 1]);
  const founderBorder = useTransform(founderGlow, (g) =>
    g > 0.4 ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.08)",
  );
  const founderShadow = useTransform(
    founderGlow,
    (g) => `0 0 ${g * 46}px -6px rgba(239,68,68,${g * 0.8})`,
  );


  return (
    <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* diagram */}
        <div className="relative h-[340px] sm:h-[400px]">
          <svg viewBox="0 0 420 380" className="absolute inset-0 h-full w-full" aria-hidden>
            {NODES.map((_, i) => {
              const y = 40 + i * 74;
              return (
                <motion.path
                  key={i}
                  d={`M 96 ${y} C 190 ${y}, 210 190, 300 190`}
                  fill="none"
                  strokeWidth={1.4}
                  style={{ stroke: edgeColor }}
                  strokeDasharray="4 6"
                  animate={{ strokeDashoffset: [0, -40] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              );
            })}
          </svg>

          <div className="absolute inset-y-0 left-0 flex w-[110px] flex-col justify-between py-1">
            {NODES.map((n) => (
              <motion.div
                key={n.id}
                className="flex items-center gap-2 rounded-lg border border-border bg-card/80 px-2 py-1.5"
              >
                <n.icon className="h-3.5 w-3.5 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-medium">{n.name.split(" ")[0]}</p>
                  <motion.p
                    className="relative truncate font-mono text-[9px]"
                    style={{ color: statusColor }}
                  >
                    <motion.span style={{ opacity: waitingOpacity }}>Waiting…</motion.span>
                    <motion.span className="absolute left-0" style={{ opacity: green }} aria-hidden>
                      Running
                    </motion.span>
                  </motion.p>

                </div>
              </motion.div>
            ))}
          </div>

          {/* orchestrator */}
          <motion.div
            style={{ opacity: orchestratorIn, scale: orchestratorScale }}
            className="absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-[color:var(--success)]/40 bg-card px-4 py-3 shadow-[0_0_40px_-8px_rgba(34,197,94,0.5)]">
              <Logo className="h-6 w-6" />
              <span className="font-display text-xs font-semibold">Opezeni</span>
            </div>
          </motion.div>

          {/* founder */}
          <motion.div
            style={{ y: founderY }}
            className="absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="flex flex-col items-center gap-2 rounded-2xl border bg-card px-4 py-3"
              style={{ borderColor: founderBorder, boxShadow: founderShadow }}
            >

              <Crown className="h-5 w-5 text-muted-foreground" />
              <span className="font-display text-xs font-semibold">Founder</span>
            </motion.div>
          </motion.div>

          {/* queue */}
          <motion.ul
            style={{ opacity: queueOpacity }}
            className="absolute right-0 bottom-0 w-[150px] space-y-1"
          >
            {QUEUE.slice(0, 5).map((q, i) => (
              <motion.li
                key={q}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                className="flex items-center gap-1.5 rounded-md border border-[color:var(--danger)]/25 bg-[color:var(--danger)]/8 px-2 py-1 text-[9px] text-muted-foreground"
              >
                <Bell className="h-2.5 w-2.5 text-[color:var(--danger)]" />
                <span className="truncate">{q}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* copy */}
        <div className="relative min-h-[180px]">
          <motion.div style={{ opacity: act1Text }} className="absolute inset-0">
            <p className="mono-label text-[color:var(--danger)]">Act 01 — The bottleneck</p>
            <h2 className="mt-3 text-3xl font-semibold text-balance-tight sm:text-4xl">
              Every decision flows through one person.
            </h2>
            <p className="mt-4 text-muted-foreground">
              That's not a company. That's a bottleneck.
            </p>
          </motion.div>
          <motion.div style={{ opacity: act2Text }} className="absolute inset-0">
            <p className="mono-label text-[color:var(--success)]">Act 02 — The transformation</p>
            <h2 className="mt-3 flex flex-wrap items-center gap-x-3 font-display text-3xl font-semibold sm:text-4xl">
              <span>Operator</span>
              <span className="text-primary">→</span>
              <span>Chairman</span>
            </h2>

            <p className="mt-4 text-muted-foreground">
              Opezeni takes the center. Agents resume. The founder receives summaries, not queues.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
