import { motion } from "framer-motion";
import { Reveal } from "./primitives";

type Entry = {
  tag: string;
  title: string;
  body: string;
};

const ENTRIES: Entry[] = [
  {
    tag: "Foundation",
    title: "IBM Professional Certificates — Agentic AI, RAG, Deep Learning",
    body: "Completed through Coursera. Self-taught before that, and still self-taught after: the certificates formalized what I was already building, they did not replace it.",
  },
  {
    tag: "Shipped",
    title: "Startup Stress-Test Agent",
    body: "A LangGraph agent served over FastAPI, with human-in-the-loop checkpoints on every consequential step. Built and deployed. It is the project Opezeni grew out of.",
  },
  {
    tag: "Learning cycles",
    title: "CogniMerse and AethraSync",
    body: "Two AI startups I founded before this one. Neither found a commercial market. Both taught me the same lesson from different angles: I was building before I had proof anyone needed it. That lesson is now a rule.",
  },
];

export function FounderTimeline() {
  return (
    <div className="relative pl-8 sm:pl-10">
      <motion.div
        className="absolute top-2 bottom-2 left-[3px] w-px origin-top bg-gradient-to-b from-primary/50 via-border to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      />

      <div className="space-y-12">
        {ENTRIES.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.1}>
            <div className="relative">
              <span
                className="absolute top-[7px] -left-8 h-[7px] w-[7px] rounded-full bg-primary ring-4 ring-background sm:-left-10"
                aria-hidden
              />
              <p className="mono-label">{e.tag}</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-balance-tight">
                {e.title}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                {e.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
