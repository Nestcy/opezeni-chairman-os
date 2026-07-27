import { createFileRoute } from "@tanstack/react-router";
import { Reveal, TiltCard } from "@/components/site/primitives";
import { FinalCTA } from "@/components/site/FinalCTA";

const TITLE = "About — Ernest Zimba and the Opezeni thesis";
const DESC =
  "Why Ernest Zimba is building Opezeni: validate first, automate last, and turn the founder from Operator into Chairman.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: AboutPage,
});

const PHILOSOPHY = [
  { k: "Automate last.", v: "A process must be understood and measured before an agent inherits it." },
  { k: "Validate first.", v: "Every loop is run manually until the decision rule is obvious." },
  { k: "Founder becomes Chairman.", v: "The goal is not more output from the founder. It is less." },
];

function AboutPage() {
  return (
    <>
      <section className="relative z-10 px-4 pt-36 pb-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="mono-label">About</p>
            <h1 className="mt-4 text-4xl leading-tight font-semibold text-balance-tight sm:text-5xl">
              Built by a founder who was the bottleneck.
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Ernest Zimba builds software companies. The pattern repeated every time: the product
              worked, customers arrived, and then everything slowed down — not because the market
              stopped, but because every decision still had to pass through one person.
            </p>
            <p>
              Support waited on a refund call. Marketing waited on a budget approval. Hiring waited
              on a calendar. The company had capacity everywhere except at its center.
            </p>
            <p>
              Opezeni started as the internal system he built to get out of the way of his own
              company: specialized agents with real mandates, a shared state, and an escalation
              path that only fires for genuine exceptions. The founder stopped operating. The
              company kept moving.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4">
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.08}>
                <TiltCard className="p-6" intensity={3}>
                  <h2 className="font-display text-lg font-semibold">{p.k}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.v}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
