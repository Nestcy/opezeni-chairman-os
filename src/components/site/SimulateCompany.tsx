import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { DEPARTMENTS, type DeptId } from "@/lib/opezeni";
import { CountUp, MagneticButton, Reveal, SectionHeader, StatusDot } from "./primitives";

const BOTTLENECKS: { id: Exclude<DeptId, "founder">; label: string }[] = [
  { id: "support", label: "Customer support" },
  { id: "marketing", label: "Marketing & growth" },
  { id: "hiring", label: "Hiring" },
  { id: "finance", label: "Finance & runway" },
  { id: "product", label: "Product decisions" },
  { id: "analytics", label: "Reporting & analytics" },
];

const REASONING = [
  "Mapping departments",
  "Finding bottlenecks",
  "Assigning AI agents",
  "Creating operational model",
];

type Phase = "intro" | "questions" | "thinking" | "result";

const fmtMoney = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `$${n}`;

export function SimulateCompany() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [mrr, setMrr] = useState(25000);
  const [team, setTeam] = useState(6);
  const [bottleneck, setBottleneck] = useState<Exclude<DeptId, "founder">>("support");
  const [thought, setThought] = useState(0);

  useEffect(() => {
    if (phase !== "thinking") return;
    setThought(0);
    const id = window.setInterval(() => {
      setThought((t) => {
        if (t >= REASONING.length) {
          window.clearInterval(id);
          return t;
        }
        return t + 1;
      });
    }, 750);
    const done = window.setTimeout(() => setPhase("result"), 750 * (REASONING.length + 1));
    return () => {
      window.clearInterval(id);
      window.clearTimeout(done);
    };
  }, [phase]);

  const hoursBack = Math.round(9 + team * 1.6 + (mrr > 50000 ? 6 : 3));
  const decisionsPerWeek = Math.round(24 + team * 7 + mrr / 2500);
  const runwayGain = Math.round(6 + team * 1.4);
  const projectedMrr = Math.round(mrr * 1.19);
  const primary = DEPARTMENTS.find((d) => d.id === bottleneck)!;
  const others = DEPARTMENTS.filter(
    (d) => d.id !== "founder" && d.id !== "sales" && d.id !== bottleneck,
  );

  return (
    <section id="simulate" className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Live simulation"
          title="Simulate my company"
          subtitle="Three questions. Opezeni builds an operating model of your company and shows you which loops it takes over first. Nothing is stored or sent anywhere."
          align="center"
        />

        <Reveal className="glass mt-12 overflow-hidden rounded-3xl p-5 sm:p-8">
          <AnimatePresence mode="wait">
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex flex-col items-center py-14 text-center"
              >
                <p className="max-w-md text-muted-foreground">
                  See your own company running itself — with your revenue, your headcount and your
                  worst operational loop.
                </p>
                <MagneticButton
                  onClick={() => {
                    setPhase("questions");
                    setStep(0);
                  }}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground glow-accent"
                >
                  Simulate My Company
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </motion.div>
            )}

            {phase === "questions" && (
              <motion.div
                key={`q${step}`}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.4 }}
                className="py-6"
              >
                <p className="mono-label">
                  Question {step + 1} of 3
                </p>

                {step === 0 && (
                  <div className="mt-5">
                    <h3 className="text-2xl font-semibold">Monthly recurring revenue</h3>
                    <p className="mt-6 font-display text-4xl font-semibold text-primary">
                      {fmtMoney(mrr)}
                    </p>
                    <input
                      type="range"
                      min={1000}
                      max={200000}
                      step={1000}
                      value={mrr}
                      aria-label="Monthly recurring revenue"
                      onChange={(e) => setMrr(Number(e.target.value))}
                      className="mt-5 w-full accent-[color:var(--primary)]"
                    />
                    <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
                      <span>$1k</span>
                      <span>$200k</span>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="mt-5">
                    <h3 className="text-2xl font-semibold">Team size</h3>
                    <p className="mt-6 font-display text-4xl font-semibold text-primary">
                      {team} {team === 1 ? "person" : "people"}
                    </p>
                    <input
                      type="range"
                      min={1}
                      max={60}
                      step={1}
                      value={team}
                      aria-label="Team size"
                      onChange={(e) => setTeam(Number(e.target.value))}
                      className="mt-5 w-full accent-[color:var(--primary)]"
                    />
                    <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
                      <span>1</span>
                      <span>60</span>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-5">
                    <h3 className="text-2xl font-semibold">Biggest operational bottleneck</h3>
                    <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
                      {BOTTLENECKS.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBottleneck(b.id)}
                          aria-pressed={bottleneck === b.id}
                          className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                            bottleneck === b.id
                              ? "border-primary/60 bg-primary/10 text-foreground"
                              : "border-border bg-card/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => (step === 0 ? setPhase("intro") : setStep((s) => s - 1))}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => (step === 2 ? setPhase("thinking") : setStep((s) => s + 1))}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-shadow hover:glow-accent"
                  >
                    {step === 2 ? "Build my operating model" : "Continue"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {phase === "thinking" && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16"
              >
                <p className="text-center font-display text-xl font-medium">
                  Opezeni is learning your company…
                </p>
                <ul className="mx-auto mt-9 max-w-sm space-y-3">
                  {REASONING.map((r, i) => (
                    <li key={r} className="flex items-center gap-3 font-mono text-[13px]">
                      {i < thought ? (
                        <Check className="h-4 w-4 text-[color:var(--success)]" />
                      ) : i === thought ? (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <span className="h-4 w-4" />
                      )}
                      <span className={i <= thought ? "text-foreground" : "text-muted-foreground/50"}>
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <StatusDot tone="success" />
                    <span className="mono-label">
                      Your operating model — {fmtMoney(mrr)} MRR · {team} people
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPhase("questions");
                      setStep(0);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Run again
                  </button>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  {[
                    { l: "Hours back / week", v: hoursBack, s: " hrs" },
                    { l: "Decisions handled", v: decisionsPerWeek, s: " / wk" },
                    { l: "Runway extended", v: runwayGain, s: " days" },
                    { l: "Projected MRR", v: projectedMrr, p: "$" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-2xl border border-border bg-card/70 p-4">
                      <p className="text-[11px] text-muted-foreground">{m.l}</p>
                      <p className="mt-1 font-display text-2xl font-semibold">
                        <CountUp value={m.v} prefix={m.p ?? ""} suffix={m.s ?? ""} />
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-2xl border border-primary/40 bg-primary/[0.07] p-4">
                  <div className="flex items-center gap-3">
                    <primary.icon className="h-4 w-4 text-primary" aria-hidden />
                    <div>
                      <p className="text-sm font-medium">
                        First loop taken over — {primary.name}
                      </p>
                      <p className="mt-0.5 text-[13px] text-muted-foreground">{primary.summary}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {others.map((d, i) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-3.5 py-3"
                    >
                      <d.icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium">{d.name}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{d.status}</p>
                      </div>
                      <StatusDot tone="success" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col items-center gap-3 text-center">
                  <p className="max-w-md text-sm text-muted-foreground">
                    This is a model, not a promise. The discovery call is where we check it against
                    your real numbers.
                  </p>
                  <Link to="/book">
                    <MagneticButton className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground glow-accent">
                      Book Discovery Call
                      <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
