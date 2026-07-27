import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DEPARTMENTS, type DeptId } from "@/lib/opezeni";
import { Reveal, SectionHeader, TiltCard } from "@/components/site/primitives";
import { Simulations } from "@/components/site/Simulations";
import { FinalCTA } from "@/components/site/FinalCTA";

const TITLE = "Product — Opezeni agents that run the company";
const DESC =
  "Six specialized Opezeni agents own marketing, support, hiring, finance, product and analytics. See exactly what each one decides and executes.";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const [dept, setDept] = useState<Exclude<DeptId, "founder">>("finance");
  const agents = DEPARTMENTS.filter((d) => d.id !== "founder");

  return (
    <>
      <section className="relative z-10 px-4 pt-36 pb-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <p className="mono-label">Product</p>
            <h1 className="mt-4 text-hero leading-tight text-balance-tight">
              Not automations. Operators that decide.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Workflow tools wait for a trigger. Opezeni agents hold a mandate, a budget and a
              policy — and act inside them.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06}>
                <TiltCard className="h-full p-6">
                  <a.icon className="h-5 w-5 text-primary" aria-hidden />
                  <h2 className="mt-4 font-display text-lg">{a.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.summary}</p>
                  <ul className="mt-5 space-y-1.5">
                    {a.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-2 text-[13px] text-foreground/80"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-24" />
          <SectionHeader

            eyebrow="Guardrails"
            title="Autonomy with a ceiling."
            subtitle="Every agent operates inside spend limits, policy documents and escalation rules you set once. Exceptions come to you as a single brief — never as a queue."
          />
        </div>
      </section>

      <Simulations active={dept} onChange={setDept} />
      <FinalCTA />
    </>
  );
}
