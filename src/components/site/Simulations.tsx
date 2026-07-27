import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { DEPARTMENTS, type DeptId } from "@/lib/opezeni";
import { SectionHeader, Reveal, StatusDot } from "./primitives";

type Row = { label: string; from: number; to: number; unit?: string };
type Sim = {
  title: string;
  subtitle: string;
  rowsLabel: string;
  rows: Row[];
  metric: { label: string; from: number; to: number; prefix?: string; suffix?: string; dec?: number };
  log: string[];
};

const STEP_MS = 3200;
const STEPS = 6;

export const SIMS: Record<Exclude<DeptId, "founder">, Sim> = {
  marketing: {
    title: "Reallocating ad budget",
    subtitle: "The agent moves spend toward channels that convert, hour by hour.",
    rowsLabel: "Channel allocation",
    rows: [
      { label: "Google Ads", from: 34, to: 46, unit: "%" },
      { label: "Meta Ads", from: 41, to: 18, unit: "%" },
      { label: "Partnerships", from: 15, to: 24, unit: "%" },
      { label: "Content", from: 10, to: 12, unit: "%" },
    ],
    metric: { label: "Blended ROAS", from: 2.4, to: 3.1, suffix: "x", dec: 1 },
    log: [
      "Pulling 30-day spend and conversion data",
      "Meta CAC up 38% week over week",
      "Pausing two underperforming creatives",
      "Shifting $6,400 to Google Ads exact match",
      "Partnership channel scaled within CAC ceiling",
      "New allocation live — ROAS +18%",
    ],
  },
  finance: {
    title: "Forecasting runway",
    subtitle: "Continuous cashflow modelling instead of a monthly spreadsheet panic.",
    rowsLabel: "Cash drivers",
    rows: [
      { label: "Payroll", from: 62, to: 62, unit: "k" },
      { label: "Infra", from: 18, to: 12, unit: "k" },
      { label: "Tools", from: 9, to: 5, unit: "k" },
      { label: "Collections", from: 71, to: 88, unit: "k" },
    ],
    metric: { label: "Runway", from: 22, to: 27, suffix: " mo" },
    log: [
      "Syncing Stripe, bank and payroll ledgers",
      "Detected 14 overlapping SaaS subscriptions",
      "Cancelling unused seats — $4.1k/mo recovered",
      "Dunning re-run recovers $17k in failed charges",
      "Infra rightsized to actual utilisation",
      "Runway extended from 22 to 27 months",
    ],
  },
  support: {
    title: "Resolving conversations",
    subtitle: "Full-thread resolution with policy-safe refunds and clean escalation.",
    rowsLabel: "Queue state",
    rows: [
      { label: "Open", from: 61, to: 8 },
      { label: "Auto-resolved", from: 0, to: 43 },
      { label: "Escalated", from: 0, to: 4 },
      { label: "Bugs filed", from: 0, to: 6 },
    ],
    metric: { label: "Median first reply", from: 240, to: 40, suffix: "s" },
    log: [
      "61 conversations in queue",
      "Clustering by intent and account tier",
      "Answering billing and onboarding threads",
      "Issuing 3 refunds inside policy limits",
      "Filing 6 reproducible bugs to the backlog",
      "43 resolved, 4 escalated with full context",
    ],
  },
  hiring: {
    title: "Ranking candidates",
    subtitle: "Structured screening against the role scorecard, not vibes.",
    rowsLabel: "Shortlist score",
    rows: [
      { label: "A. Mwansa", from: 0, to: 92 },
      { label: "J. Okafor", from: 0, to: 88 },
      { label: "R. Duarte", from: 0, to: 71 },
      { label: "S. Lindqvist", from: 0, to: 64 },
    ],
    metric: { label: "Screened", from: 0, to: 214 },
    log: [
      "214 applications ingested",
      "Scoring against the role scorecard",
      "Async take-home reviewed for 26 candidates",
      "Reference signals cross-checked",
      "Two finalists ranked above threshold",
      "Interviews scheduled for Thursday",
    ],
  },
  product: {
    title: "Prioritizing the roadmap",
    subtitle: "Evidence-weighted sequencing across support, revenue and churn signals.",
    rowsLabel: "Impact score",
    rows: [
      { label: "SSO for teams", from: 22, to: 94 },
      { label: "Usage-based billing", from: 40, to: 78 },
      { label: "Mobile app", from: 66, to: 31 },
      { label: "Theme editor", from: 55, to: 19 },
    ],
    metric: { label: "Requests clustered", from: 0, to: 1380 },
    log: [
      "1,380 feedback items clustered",
      "Mapping requests to revenue at risk",
      "SSO blocks $214k of pipeline",
      "Mobile demand concentrated in free tier",
      "Specs drafted for the top two items",
      "Roadmap resequenced and published",
    ],
  },
  analytics: {
    title: "Detecting churn",
    subtitle: "Every cohort watched continuously; risk surfaced before renewal.",
    rowsLabel: "Risk cohort",
    rows: [
      { label: "Enterprise", from: 4, to: 2 },
      { label: "Growth", from: 11, to: 6 },
      { label: "Starter", from: 26, to: 19 },
      { label: "Trials", from: 33, to: 21 },
    ],
    metric: { label: "Net revenue retention", from: 96, to: 108, suffix: "%" },
    log: [
      "Scanning 3,412 accounts for usage decay",
      "6 enterprise accounts show login drop-off",
      "Seat expansion stalled in 11 workspaces",
      "Triggering targeted save-plays",
      "Support and success handed full context",
      "NRR recovered to 108%",
    ],
  },
  sales: {
    title: "Working the pipeline",
    subtitle: "Inbound qualified, sequenced and logged without a rep chasing it.",
    rowsLabel: "Pipeline stage",
    rows: [
      { label: "New inbound", from: 48, to: 12 },
      { label: "Qualified", from: 6, to: 27 },
      { label: "Demo booked", from: 2, to: 14 },
      { label: "Stalled", from: 19, to: 5 },
    ],
    metric: { label: "Pipeline value", from: 180, to: 412, prefix: "$", suffix: "k" },
    log: [
      "48 inbound leads awaiting triage",
      "Enriching firmographics and intent",
      "Disqualifying 9 out-of-ICP leads",
      "Personalised sequences sent to 27 accounts",
      "14 demos booked into the calendar",
      "CRM updated — pipeline at $412k",
    ],
  },
};

export function Simulations({
  active,
  onChange,
}: {
  active: Exclude<DeptId, "founder">;
  onChange: (id: Exclude<DeptId, "founder">) => void;
}) {
  const sim = SIMS[active];
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStep(0);
    setPlaying(true);
  }, [active]);

  useEffect(() => {
    if (!playing) return;
    if (step >= STEPS - 1) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, step]);

  const t = step / (STEPS - 1);
  const rows = useMemo(
    () => sim.rows.map((r) => ({ ...r, now: r.from + (r.to - r.from) * t })),
    [sim, t],
  );
  const max = Math.max(...rows.map((r) => Math.max(r.from, r.to))) || 1;
  const metricNow = sim.metric.from + (sim.metric.to - sim.metric.from) * t;
  const done = step >= STEPS - 1;

  const tabs = DEPARTMENTS.filter((d) => d.id !== "founder");

  return (
    <section id="simulations" className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Watch each agent make a decision."
          subtitle="No videos. Every simulation below is running live in your browser — roughly twenty seconds each."
        />

        <Reveal className="mt-10 flex flex-wrap gap-2">
          {tabs.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => onChange(d.id as Exclude<DeptId, "founder">)}
              aria-pressed={active === d.id}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm transition-colors ${
                active === d.id
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <d.icon className="h-3.5 w-3.5" aria-hidden />
              {d.name.replace(" Agent", "")}
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.05} className="glass mt-6 rounded-3xl p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <StatusDot tone={done ? "accent" : "success"} paused={!playing} />
                <h3 className="font-display text-xl">{sim.title}</h3>
              </div>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">{sim.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {playing ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setPlaying(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Replay
              </button>
            </div>
          </div>

          <div className="mt-6 h-0.5 w-full overflow-hidden rounded-full bg-foreground/8">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${(step / (STEPS - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl border border-border bg-surface/60 p-5">
              <p className="mono-label">{sim.rowsLabel}</p>
              <div className="mt-5 space-y-4">
                {rows.map((r) => (
                  <div key={r.label}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="text-foreground/85">{r.label}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {r.now.toFixed(r.unit === "%" || r.now < 10 ? 1 : 0)}
                        {r.unit ?? ""}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-foreground/8">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            r.to >= r.from ? "var(--primary)" : "var(--muted-foreground)",
                        }}
                        animate={{ width: `${(r.now / max) * 100}%` }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-border bg-card/70 p-4">
                <p className="text-[11px] text-muted-foreground">{sim.metric.label}</p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {sim.metric.prefix ?? ""}
                  {metricNow.toLocaleString("en-US", {
                    minimumFractionDigits: sim.metric.dec ?? 0,
                    maximumFractionDigits: sim.metric.dec ?? 0,
                  })}
                  {sim.metric.suffix ?? ""}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/60 p-5">
              <p className="mono-label">Agent reasoning</p>
              <div ref={logRef} className="mt-4 space-y-2.5">
                <AnimatePresence initial={false}>
                  {sim.log.slice(0, step + 1).map((line, i) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.45 }}
                      className="flex items-start gap-2.5"
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          i === step ? "bg-primary" : "bg-foreground/25"
                        }`}
                      />
                      <p
                        className={`font-mono text-[12px] leading-relaxed ${
                          i === step ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {line}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {done && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-5 rounded-lg border border-[color:var(--success)]/30 bg-[color:var(--success)]/10 px-3 py-2 font-mono text-[11px] text-[color:var(--success)]"
                >
                  Decision executed. Founder notified in the weekly brief.
                </motion.p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
