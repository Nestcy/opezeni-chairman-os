import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Activity, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { DEPARTMENTS } from "@/lib/opezeni";
import { CountUp, MagneticButton, StatusDot } from "./primitives";

const AGENTS = DEPARTMENTS.filter((d) => d.id !== "founder" && d.id !== "sales");

const FEED = [
  "Marketing Agent increased ROAS 18%",
  "Support Agent resolved 43 tickets",
  "Hiring Agent shortlisted two candidates",
  "Finance Agent extended cash runway by 21 days",
  "Product Agent reprioritized the Q3 roadmap",
  "Analytics Agent flagged 6 churn-risk accounts",
];

function spark(seed: number, trendUp = true) {
  return Array.from({ length: 16 }, (_, i) => ({
    v: 40 + Math.sin(i / 2 + seed) * 8 + (trendUp ? i * 2.4 : -i * 1.1),
  }));
}

const METRICS = [
  { label: "Revenue", value: 482400, prefix: "$", suffix: "", delta: "+12.4%", seed: 1 },
  { label: "MRR", value: 41800, prefix: "$", suffix: "", delta: "+6.1%", seed: 2 },
  { label: "Growth", value: 18.6, prefix: "", suffix: "%", delta: "+2.3 pts", seed: 3, dec: 1 },
  { label: "Runway", value: 27, prefix: "", suffix: " mo", delta: "+21 days", seed: 4 },
];

export function HeroDashboard() {
  const [feedIndex, setFeedIndex] = useState(0);
  const charts = useMemo(() => METRICS.map((m) => spark(m.seed)), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => setFeedIndex((i) => (i + 1) % FEED.length), 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative z-10 px-4 pt-32 pb-20 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
            <Sparkles className="h-3 w-3 text-primary" />
            Autonomous company OS
          </span>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold text-balance-tight sm:text-6xl">
            Run your software company
            <br className="hidden sm:block" /> without running it.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            The autonomous operating system for SaaS founders.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#think">
              <MagneticButton className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground glow-accent">
                Experience Opezeni
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
            >
              Book Discovery Call
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="glass mt-14 rounded-3xl p-3 shadow-[0_40px_120px_-40px_rgba(0,0,0,1)] sm:p-4"
        >
          <div className="flex items-center justify-between px-2 pb-3">
            <div className="flex items-center gap-2">
              <StatusDot tone="success" />
              <span className="mono-label">Opezeni console — live</span>
            </div>
            <span className="mono-label hidden sm:inline">Autonomy 94%</span>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.55fr_1fr]">
            {/* Company health */}
            <div className="flex flex-col rounded-2xl border border-border bg-surface/60 p-4">

              <p className="mono-label">Company health</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {METRICS.map((m, i) => (
                  <div key={m.label} className="rounded-xl border border-border bg-card/70 p-3">
                    <p className="text-[11px] text-muted-foreground">{m.label}</p>
                    <p className="mt-1 font-display text-lg font-semibold sm:text-xl">
                      <CountUp
                        value={m.value}
                        prefix={m.prefix}
                        suffix={m.suffix}
                        decimals={m.dec ?? 0}
                      />
                    </p>
                    <p className="text-[11px] font-medium text-[color:var(--success)]">
                      {m.delta}
                    </p>
                    <div className="mt-2 h-9">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={charts[i]}>
                          <defs>
                            <linearGradient id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.45} />
                              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="v"
                            stroke="#3B82F6"
                            strokeWidth={1.5}
                            fill={`url(#g${i})`}
                            isAnimationActive
                            animationDuration={1600}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-border bg-card/70 p-3 lg:mt-auto">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-primary" />
                  <span className="mono-label">Activity stream</span>
                </div>
                <div className="relative mt-2 h-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={feedIndex}
                      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 font-mono text-[12px] text-foreground/90"
                    >
                      {FEED[feedIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Agent status */}
            <div className="rounded-2xl border border-border bg-surface/60 p-4">
              <p className="mono-label">Agent status</p>
              <ul className="mt-4 space-y-2">
                {AGENTS.map((a, i) => (
                  <motion.li
                    key={a.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.09, duration: 0.5 }}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-3 py-2.5"
                  >
                    <a.icon className="h-4 w-4 text-primary" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">{a.name}</p>
                      <p className="truncate text-[11px] text-muted-foreground">{a.status}</p>
                    </div>
                    <StatusDot tone="success" />
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
