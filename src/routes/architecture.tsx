import { createFileRoute } from "@tanstack/react-router";
import { Architecture } from "@/components/site/Architecture";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Reveal, TiltCard } from "@/components/site/primitives";

const TITLE = "Architecture — How Opezeni orchestrates your stack";
const DESC =
  "Founder to orchestrator to specialized agents to Slack, GitHub, Stripe, HubSpot, Linear, Notion and ad platforms. The full Opezeni system architecture.";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ArchitecturePage,
});

const LAYERS = [
  {
    name: "Mandate layer",
    body: "Policies, budgets and escalation thresholds. The only place a human writes rules.",
  },
  {
    name: "Orchestration layer",
    body: "Routes work between agents, resolves conflicts, and keeps a single company-wide state.",
  },
  {
    name: "Agent layer",
    body: "Six specialists with tools, memory and the authority to execute inside the mandate.",
  },
  {
    name: "Integration layer",
    body: "Bi-directional writes into the tools your company already runs on.",
  },
];

function ArchitecturePage() {
  return (
    <>
      <section className="relative z-10 px-4 pt-36 pb-4">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <p className="mono-label">Architecture</p>
            <h1 className="mt-4 text-hero leading-tight text-balance-tight">
              A company, expressed as a system.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Four layers, one state. Nothing is stored in a founder's head.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LAYERS.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.07}>
                <TiltCard className="h-full p-6">
                  <p className="mono-label">Layer 0{i + 1}</p>
                  <h2 className="mt-3 font-display text-base">{l.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Architecture />
      <FinalCTA />
    </>
  );
}
