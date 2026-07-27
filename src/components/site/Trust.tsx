import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeader, TiltCard } from "./primitives";

const REFERENCES = [
  {
    author: "Paul Graham",
    work: "Do Things That Don't Scale",
    href: "https://paulgraham.com/ds.html",
    note: "The unscalable phase is a stage, not an identity. Opezeni exists for what comes after it — when manual heroics stop compounding and start capping the company.",
  },
  {
    author: "Elon Musk",
    work: "The Algorithm",
    href: "https://en.wikipedia.org/wiki/Elon_Musk",
    note: "Question the requirement, delete the part, simplify, accelerate, then automate — in that order. Opezeni automates last, after the process has earned it.",
  },
  {
    author: "Opezeni philosophy",
    work: "Validate first. Automate last.",
    href: null,
    note: "We never automate a broken process. Agents inherit a process only once it is defined, measured and proven by a human first.",
  },
];

export function Trust() {
  return (
    <section className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Referenced thinking"
          title="Ideas this system is built on."
          subtitle="Not testimonials. The essays and operating principles that shaped how Opezeni sequences autonomy."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {REFERENCES.map((r, i) => (
            <Reveal key={r.work} delay={i * 0.08}>
              <TiltCard className="h-full p-6">
                <p className="mono-label">{r.author}</p>
                <h3 className="mt-3 font-display text-lg leading-snug font-semibold">{r.work}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{r.note}</p>
                {r.href && (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Reference
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
