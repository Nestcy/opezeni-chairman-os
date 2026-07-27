import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { MagneticButton } from "./primitives";

/** Chapter 00 — the promise, before the film starts. */
export function HeroIntro() {
  return (
    <section className="relative z-10 flex min-h-[92vh] items-center justify-center px-4 pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="mono-label inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
          <Sparkles className="h-3 w-3 text-primary" />
          Autonomous company OS
        </span>
        <h1 className="mt-6 text-4xl leading-[1.05] font-semibold text-balance-tight sm:text-6xl">
          Run your software company
          <br className="hidden sm:block" /> without running it.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          The autonomous operating system for SaaS founders.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#think">
            <MagneticButton className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground glow-accent">
              Experience Opezeni
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </a>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
          >
            Book Discovery Call
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 1.2 }, y: { repeat: Infinity, duration: 2.4 } }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="mono-label">Scroll</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
        </motion.div>
      </motion.div>
    </section>
  );
}
