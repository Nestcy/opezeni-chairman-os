import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MagneticButton, Reveal, TiltCard } from "@/components/site/primitives";
import { FounderTimeline } from "@/components/site/FounderTimeline";
import { VisionNetwork } from "@/components/site/VisionNetwork";
import portrait from "@/assets/ernest-zimba.jpg.asset.json";

const TITLE = "Ernest Zimba — Why Opezeni exists";
const DESC =
  "Ernest Zimba is a self-taught AI/ML engineer in Lusaka, Zambia, building Opezeni: agentic systems that make decisions, not just automate tasks.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    n: "01",
    k: "Automate last, not first.",
    v: "Automation is an amplifier. Point it at a broken process and you get a broken process running faster and costing more. A loop gets automated only after it has been run by hand enough times that the decision rule is boring.",
  },
  {
    n: "02",
    k: "Validate before you build.",
    v: "An idea is an assumption wearing a roadmap. It stays an assumption until a customer pays, switches, or changes behaviour because of it. Every feature has to earn the right to exist before it gets written.",
  },
  {
    n: "03",
    k: "Founders should design the future, not operate the present.",
    v: "Most founder time goes into coordination — approvals, handoffs, status. That work is real, but it is not the work only a founder can do. Opezeni exists to absorb the operating layer so the strategic layer gets the whole calendar.",
  },
];

function AboutPage() {
  return (
    <>
      {/* ---------------- Section 1 — Why Opezeni exists ---------------- */}
      <section className="relative z-10 px-4 pt-36 pb-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="mono-label">Why Opezeni exists</p>
            <h1 className="mt-5 text-4xl leading-[1.08] font-semibold text-balance-tight sm:text-5xl">
              Most AI automates the work. The founder still makes every decision.
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border">
                <img
                  src={portrait.url}
                  alt="Ernest Zimba, founder of Opezeni"
                  className="h-full w-full object-cover grayscale"
                  loading="lazy"
                />
                <span
                  className="absolute inset-0 bg-primary/25 mix-blend-color"
                  aria-hidden
                />
              </div>
              <div className="font-mono text-[11px] leading-relaxed tracking-wider text-muted-foreground uppercase">
                <p className="text-foreground">Ernest Zimba</p>
                <p>Founder — AI/ML engineer</p>
                <p>Lusaka, Zambia</p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.15}
            className="mt-12 space-y-6 text-[15px] leading-relaxed text-muted-foreground"
          >
            <p>
              I'm self-taught. I started building agentic AI systems in 2026, after spending
              enough time with AI products to notice what they all had in common: they took over
              the typing and left the founder holding every judgement call.
            </p>
            <p>
              Opezeni came out of something smaller. I was building a stress-test agent — a system
              that pressure-tests a startup idea against its own assumptions before anyone writes
              code.
            </p>
            <p>
              Building it raised a question I could not put down:{" "}
              <span className="text-foreground">
                what happens to a SaaS founder's job once AI can make decisions instead of just
                executing tasks?
              </span>
            </p>
            <p>
              That is the whole thesis. Opezeni is a company operating system where specialized
              agents hold real mandates, act inside guardrails, and escalate only genuine
              exceptions — so the company keeps moving when the founder is not in the room.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Section 2 — Operating principles ---------------- */}
      <section className="relative z-10 px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="mono-label">How I think</p>
            <h2 className="mt-4 text-3xl font-semibold text-balance-tight sm:text-4xl">
              Operating principles
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <TiltCard className="p-7 sm:p-8" intensity={3}>
                  <p className="font-mono text-xs tracking-widest text-primary">{p.n}</p>
                  <h3 className="mt-4 font-display text-lg font-semibold sm:text-xl">{p.k}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.v}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Section 3 — Track record ---------------- */}
      <section className="relative z-10 px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="mono-label">Track record</p>
            <h2 className="mt-4 text-3xl font-semibold text-balance-tight sm:text-4xl">
              What I have actually shipped.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Stated plainly, without rounding up.
            </p>
          </Reveal>

          <div className="mt-14">
            <FounderTimeline />
          </div>
        </div>
      </section>

      {/* ---------------- Section 4 — Long-term vision ---------------- */}
      <section className="relative z-10 px-4 pt-16 pb-32">
        <Reveal className="glass relative mx-auto max-w-4xl overflow-hidden rounded-3xl px-6 py-20 sm:px-14">
          <VisionNetwork className="pointer-events-none absolute -top-10 -right-16 h-56 w-[520px] opacity-70" />

          <div className="relative">
            <h2 className="max-w-2xl text-4xl font-semibold text-balance-tight sm:text-5xl">
              I'm not building another AI tool.
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Software companies are entering the same kind of transition as the move from
                on-premise to cloud. Not a better version of the old shape — a different shape.
              </p>
              <p>
                Today's AI assists people. Tomorrow's AI will operate systems. The difference is
                who holds the decision.
              </p>
              <p>
                The founder's role does not disappear in that world. It moves. From operator to
                chairman: setting direction, approving exceptions, and leaving the day-to-day to a
                system built to run it.
              </p>
              <p className="text-foreground">
                I intend to spend a long time on this problem.
              </p>
            </div>

            <div className="mt-10">
              <Link to="/book">
                <MagneticButton className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground glow-accent">
                  Book a discovery call
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Thirty minutes to explore whether Opezeni fits your company.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
