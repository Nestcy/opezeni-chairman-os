import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, Video } from "lucide-react";
import { Reveal } from "@/components/site/primitives";

const TITLE = "Book a discovery call — Opezeni";
const DESC =
  "Book a 30-minute discovery call. We map your decision flow and show which operating loops Opezeni can take over first.";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: BookPage,
});

const FACTS = [
  { icon: Clock, label: "30 minutes" },
  { icon: Video, label: "Video call" },
  { icon: CalendarDays, label: "Usually within 48 hours" },
];

function BookPage() {
  return (
    <section className="relative z-10 px-4 pt-36 pb-28">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="mono-label">Discovery</p>
          <h1 className="mt-4 text-4xl leading-tight font-semibold text-balance-tight">
            Let's map your bottleneck.
          </h1>
          <p className="mt-5 text-muted-foreground">
            Bring the three decisions that most often wait on you. We'll show which agent takes
            them, what policy it needs, and what your weekly brief would look like.
          </p>
          <ul className="mt-8 space-y-3">
            {FACTS.map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-sm text-foreground/85">
                <f.icon className="h-4 w-4 text-primary" aria-hidden />
                {f.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="glass rounded-3xl p-2">
          <div className="flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center">
            <CalendarDays className="h-6 w-6 text-primary" aria-hidden />
            <h2 className="mt-4 font-display text-lg font-semibold">Scheduling</h2>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              The live calendar embed drops in here. Until then, reach out directly and we'll send
              times.
            </p>
            <a
              href="mailto:hello@opezeni.com?subject=Opezeni%20discovery%20call"
              className="mt-6 inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-shadow hover:glow-accent"
            >
              Request times
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
