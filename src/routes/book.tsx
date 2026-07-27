import { createFileRoute } from "@tanstack/react-router";
import Cal from "@calcom/embed-react";
import { CalendarDays, Clock, Video } from "lucide-react";
import { Reveal } from "@/components/site/primitives";
import { DiscoveryProcess } from "@/components/site/DiscoveryProcess";

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
    <>
      <section id="calendar" className="relative z-10 px-4 pt-36 pb-8">
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

        <Reveal delay={0.1} className="glass overflow-hidden rounded-3xl p-2">
          <div className="relative min-h-[580px] overflow-hidden rounded-2xl bg-surface/50">
            <Cal
              calLink="ernest-ho5gwm/problem-discovery-interview"
              config={{
                layout: "month_view",
                theme: "dark",
              }}

              style={{
                width: "100%",
                height: "100%",
                minHeight: "580px",
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
