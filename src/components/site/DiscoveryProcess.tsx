import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Check,
  Crown,
  FileText,
  Network,
  PhoneCall,
  Rocket,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { MagneticButton, Reveal, SectionHeader, TiltCard } from "./primitives";
import { cn } from "@/lib/utils";

type Stage = {
  step: string;
  title: string;
  icon: LucideIcon;
  chip?: string;
  intro?: string;
  listLabel?: string;
  bullets?: string[];
  outro?: string[];
};

const STAGES: Stage[] = [
  {
    step: "Step 01",
    title: "Discovery Call",
    icon: PhoneCall,
    chip: "20–30 minutes",
    listLabel: "We'll understand:",
    bullets: [
      "Your current business",
      "Your team",
      "Your existing software stack",
      "Your biggest operational bottlenecks",
      "The decisions that still depend on you",
    ],
    outro: ["No sales pressure. No obligation."],
  },
  {
    step: "Step 02",
    title: "Operational Architecture",
    icon: Network,
    intro:
      "If there's a strong fit, we'll design how Opezeni would operate inside your company.",
    listLabel: "We'll map:",
    bullets: [
      "Marketing",
      "Customer Support",
      "Finance",
      "Hiring",
      "Product",
      "Analytics",
    ],
    outro: [
      "We'll identify which workflows should remain human-led and which can be delegated to AI agents.",
      "Think of this as designing your company's future operating system.",
    ],
  },
  {
    step: "Step 03",
    title: "Custom Proposal",
    icon: FileText,
    intro: "You'll receive a tailored implementation proposal that includes:",
    bullets: [
      "Scope of work",
      "AI agents to be deployed",
      "Integrations",
      "Delivery timeline",
      "Fixed pricing",
    ],
    outro: ["Everything is defined before any development begins."],
  },
  {
    step: "Step 04",
    title: "Secure Your Build",
    icon: ShieldCheck,
    intro:
      "If you choose to move forward, you'll secure your implementation with an agreed deposit or escrow payment.",
    outro: [
      "Development only begins after both sides agree on the scope.",
      "This ensures alignment and protects everyone involved.",
    ],
  },
  {
    step: "Step 05",
    title: "Build & Deployment",
    icon: Rocket,
    intro: "Opezeni is built around your existing business. Not the other way around.",
    outro: [
      "We'll integrate with your tools, test workflows, and deploy incrementally while gathering feedback.",
    ],
  },
  {
    step: "Step 06",
    title: "Operate Differently",
    icon: Crown,
    intro: "Your company continues running. But your role changes.",
    outro: [
      "Instead of coordinating operations, you focus on strategy, growth, partnerships, hiring and long-term direction.",
      "The goal isn't to replace the founder. The goal is to remove the founder as the operational bottleneck.",
    ],
  },
];

const GREAT_FIT = [
  "Technical SaaS founders",
  "$5k–$50k+ MRR",
  "Lean teams",
  "Spending too much time operating the business",
  "Looking to scale without adding unnecessary management layers",
];

const NOT_FIT = [
  "Looking for a plug-and-play chatbot",
  "Early idea-stage founders without an operating business",
  "Businesses seeking generic workflow automation",
  "Companies unwilling to collaborate during the design phase",
];

function ProgressRail({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div
      className="absolute top-0 bottom-0 left-[15px] w-px bg-border sm:left-[19px]"
      aria-hidden
    >
      <motion.div
        className="h-full w-px origin-top bg-gradient-to-b from-primary via-sand/60 to-primary/20"
        style={reduced ? { scaleY: 1 } : { scaleY }}
      />
    </div>
  );
}

function StageNode({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <motion.span
      className="glass absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10"
      initial={{ opacity: 0.4, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        initial={{ boxShadow: "0 0 0 0 transparent" }}
        whileInView={{
          boxShadow:
            "0 0 0 1px color-mix(in oklab, var(--primary) 55%, transparent), 0 8px 26px -12px color-mix(in oklab, var(--primary) 70%, transparent)",
        }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <Icon className="relative h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
    </motion.span>
  );
}

function StageCard({ stage, index }: { stage: Stage; index: number }) {
  return (
    <li className="relative pl-12 sm:pl-16">
      <StageNode icon={stage.icon} />

      <Reveal delay={0.05}>
        <div className="glass rounded-2xl p-5 transition-colors hover:border-primary/30 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <p className="mono-label">{stage.step}</p>
            {stage.chip && (
              <span className="rounded-full border border-primary/30 px-2.5 py-1 font-mono text-[10px] tracking-widest text-primary uppercase">
                {stage.chip}
              </span>
            )}
          </div>

          <h3 className="mt-3 font-display text-xl font-semibold text-balance-tight">
            {stage.title}
          </h3>

          {stage.intro && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {stage.intro}
            </p>
          )}

          {stage.bullets && (
            <>
              {stage.listLabel && (
                <p className="mt-5 text-sm font-medium text-foreground/85">{stage.listLabel}</p>
              )}
              <ul
                className={cn(
                  "grid gap-2.5",
                  stage.listLabel ? "mt-3" : "mt-5",
                  stage.bullets.length > 4 && "sm:grid-cols-2",
                )}
              >
                {stage.bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    className="flex items-start gap-2.5 text-base text-muted-foreground"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </>
          )}

          {stage.outro?.map((o) => (
            <p
              key={o}
              className={cn(
                "mt-4 max-w-xl text-base leading-relaxed",
                index === STAGES.length - 1 ? "text-foreground/85" : "text-muted-foreground",
              )}
            >
              {o}
            </p>
          ))}
        </div>
      </Reveal>
    </li>
  );
}

function FitCard({
  tone,
  title,
  items,
}: {
  tone: "positive" | "negative";
  title: string;
  items: string[];
}) {
  const Icon = tone === "positive" ? Check : X;
  return (
    <TiltCard className="h-full p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            tone === "positive" ? "bg-success/15 text-success" : "bg-warning/15 text-warning",
          )}
          aria-hidden
        >
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
      </div>

      <ul className="mt-6 space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Icon
              className={cn(
                "mt-1 h-3.5 w-3.5 shrink-0",
                tone === "positive" ? "text-success" : "text-warning",
              )}
              aria-hidden
            />
            {item}
          </motion.li>
        ))}
      </ul>
    </TiltCard>
  );
}

export function DiscoveryProcess({ ctaTargetId }: { ctaTargetId?: string }) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const onCta = () => {
    if (!ctaTargetId) return;
    document.getElementById(ctaTargetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="process" className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="The process"
          title="What Happens After You Book?"
          subtitle="Building an autonomous operating system starts with understanding how your company actually works."
        />

        <div ref={timelineRef} className="relative mt-14">
          <ProgressRail targetRef={timelineRef} />
          <ol className="space-y-8 sm:space-y-10">
            {STAGES.map((stage, i) => (
              <StageCard key={stage.step} stage={stage} index={i} />
            ))}
          </ol>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          <Reveal>
            <FitCard tone="positive" title="Great Fit" items={GREAT_FIT} />
          </Reveal>
          <Reveal delay={0.1}>
            <FitCard tone="negative" title="Probably Not a Fit" items={NOT_FIT} />
          </Reveal>
        </div>

        <Reveal className="glass mt-16 rounded-3xl px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-semibold text-balance-tight">
            Ready to see what Opezeni could look like inside your company?
          </h2>
          <div className="mt-8 flex justify-center">
            {ctaTargetId ? (
              <MagneticButton className="btn-primary px-6 py-3.5 text-sm" onClick={onCta}>
                Book Your Discovery Call
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            ) : (
              <Link to="/book">
                <MagneticButton className="btn-primary px-6 py-3.5 text-sm">
                  Book Your Discovery Call
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
            )}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            20–30 minutes. No obligation. You'll leave with a clearer understanding of where your
            operational bottlenecks are, whether or not we work together.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
