import { motion } from "framer-motion";
import { AlertTriangle, Check } from "lucide-react";
import { Reveal, SectionHeader } from "./primitives";

const OPERATOR = [
  "Every approval waits on one inbox",
  "Context lives in the founder's head",
  "Nights and weekends are the buffer",
  "Growth increases the queue",
];

const CHAIRMAN = [
  "Agents decide inside stated policy",
  "Context lives in the system of record",
  "Exceptions arrive as one daily brief",
  "Growth increases the throughput",
];

export function OperatorChairman() {
  return (
    <section className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="The problem"
          title="Two ways to run the same company."
          subtitle="One routes every decision through a person. The other routes it through a system."
          align="center"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-[color:var(--danger)]/25 bg-[color:var(--danger)]/[0.04] p-7">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[color:var(--danger)]" aria-hidden />
              <h3 className="font-display text-xl font-semibold">Operator</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything routes through the founder.
            </p>
            <div className="mt-6 space-y-3">
              {OPERATOR.map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--danger)]" />
                  {line}
                </motion.div>
              ))}
            </div>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full bg-[color:var(--danger)]"
                initial={{ width: "8%" }}
                whileInView={{ width: "96%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
              />
            </div>
            <p className="mono-label mt-2">Founder load</p>
          </Reveal>

          <Reveal
            delay={0.12}
            className="rounded-3xl border border-[color:var(--success)]/25 bg-[color:var(--success)]/[0.04] p-7"
          >
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[color:var(--success)]" aria-hidden />
              <h3 className="font-display text-xl font-semibold">Chairman</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything routes through Opezeni.
            </p>
            <div className="mt-6 space-y-3">
              {CHAIRMAN.map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)]" />
                  {line}
                </motion.div>
              ))}
            </div>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full bg-[color:var(--success)]"
                initial={{ width: "90%" }}
                whileInView={{ width: "14%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
              />
            </div>
            <p className="mono-label mt-2">Founder load</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
