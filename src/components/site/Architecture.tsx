import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { DEPARTMENTS, INTEGRATIONS } from "@/lib/opezeni";
import { Logo } from "./Logo";
import { Reveal, SectionHeader } from "./primitives";

const AGENTS = DEPARTMENTS.filter((d) => d.id !== "founder" && d.id !== "sales");

export function Architecture({ compact = false }: { compact?: boolean }) {
  return (
    <section className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Architecture"
          title="Founder on top. Orchestrator in the middle. Tools at the edge."
          subtitle="Every packet in this diagram maps to a real path: a decision, an approval, or an action written back into your stack."
        />

        <Reveal className="glass mt-12 rounded-3xl p-6 sm:p-10">
          {/* founder */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3">
              <Crown className="h-4 w-4 text-muted-foreground" aria-hidden />
              <span className="font-display text-sm font-semibold">Founder — Chairman</span>
            </div>
            <Flow />

            {/* orchestrator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="elevate-warm flex items-center gap-2.5 rounded-2xl border border-primary/35 bg-card px-6 py-4"
            >
              <Logo className="h-6 w-6" />
              <span className="font-display text-sm font-semibold">Opezeni Orchestrator</span>
            </motion.div>

            <Flow />

            {/* agents */}
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {AGENTS.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="rounded-xl border border-border bg-card/70 px-3 py-3 text-center"
                >
                  <a.icon className="mx-auto h-4 w-4 text-primary" aria-hidden />
                  <p className="mt-2 text-[12px] font-medium">{a.name.replace(" Agent", "")}</p>
                  <p className="mono-label mt-1 text-[9px]">Agent</p>
                </motion.div>
              ))}
            </div>
            <Flow />

            {/* integrations */}
            <div className="flex flex-wrap justify-center gap-2">
              {INTEGRATIONS.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg border border-border bg-surface/70 px-3 py-1.5 font-mono text-[11px] text-muted-foreground"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          {!compact && (
            <p className="mono-label mt-10 text-center">
              Packets flow continuously — the founder only sees exceptions
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Flow() {
  return (
    <div className="relative my-6 h-12 w-px overflow-hidden bg-foreground/10" aria-hidden>
      <motion.span
        className="absolute left-1/2 h-3 w-px -translate-x-1/2 bg-primary"
        animate={{ y: [-12, 48] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
