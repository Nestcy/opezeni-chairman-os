import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import poster from "@/assets/founder-cafe-poster.jpg.asset.json";
import clip from "@/assets/founder-cafe.mp4.asset.json";
import { HeroDashboard } from "./HeroDashboard";
import { MagneticButton } from "./primitives";

/**
 * Chapter 00 — one continuous journey.
 * A full-bleed film of the founder, undisturbed. As you scroll it scales,
 * blurs and recedes while the live Opezeni console rises from below and the
 * hero copy settles on top. No hard cuts anywhere.
 */
export function CinematicOpening() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      progress.set(Math.min(1, Math.max(0, -rect.top / travel)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [progress, reduced]);

  if (reduced) return <StaticOpening />;

  return (
    <section ref={ref} className="relative z-10 h-[250vh]" aria-label="Opezeni opening sequence">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Stage progress={progress} />
      </div>
    </section>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  // the film: untouched at rest, then it swells, softens and recedes
  const filmScale = useTransform(progress, [0.2, 0.65], [1, 1.12]);
  const filmOpacity = useTransform(progress, [0.2, 0.65], [1, 0.25]);
  const filmBlur = useTransform(progress, [0.2, 0.65], [0, 18]);
  const filmBrightness = useTransform(progress, [0.2, 0.65], [1, 0.45]);
  const filmFilter = useTransform(
    [filmBlur, filmBrightness] as MotionValue<number>[],
    ([b, br]: number[]) => `blur(${b}px) brightness(${br})`,
  );
  const veil = useTransform(progress, [0.25, 0.7], [0, 0.75]);

  const cueOpacity = useTransform(progress, [0, 0.08, 0.15], [1, 1, 0]);

  // the console rises from below and locks into the viewport
  const dashY = useTransform(progress, [0.35, 0.75], ["24vh", "0vh"]);
  const dashScale = useTransform(progress, [0.35, 0.75], [0.94, 1]);
  const dashOpacity = useTransform(progress, [0.35, 0.6], [0, 1]);

  // hero copy only once we are inside the product
  const copyOpacity = useTransform(progress, [0.7, 0.9], [0, 1]);
  const copyY = useTransform(progress, [0.7, 0.9], [22, 0]);

  return (
    <div className="relative h-full w-full">
      <motion.div
        style={{ scale: filmScale, opacity: filmOpacity, filter: filmFilter }}
        className="absolute inset-0"
      >
        <Film />
      </motion.div>
      <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-background" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />

      {/* scroll cue — the only thing over the film at rest */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2"
      >
        <span className="mono-label">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
        </motion.div>
      </motion.div>

      {/* the operating system */}
      <motion.div
        style={{ y: dashY, scale: dashScale, opacity: dashOpacity }}
        className="absolute inset-0 flex flex-col justify-center px-4"
      >
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="mx-auto w-full max-w-3xl pb-5 text-center"
        >
          <h1 className="text-3xl leading-[1.05] font-semibold text-balance-tight sm:text-5xl">
            Run your software company
            <br className="hidden sm:block" /> without running it.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            The autonomous operating system for SaaS founders.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a href="#think">
              <MagneticButton className="btn-primary px-5 py-2.5 text-sm">
                Experience Opezeni
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link to="/book" className="btn-secondary px-5 py-2.5 text-sm">
              Book Discovery Call
            </Link>
          </div>
        </motion.div>

        <HeroDashboard embedded />
      </motion.div>
    </div>
  );
}

function Film() {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => undefined);
  }, []);

  return (
    <>
      <img
        src={poster.url}
        alt="A founder sipping tea at an ocean-side cafe at golden hour"
        width={1280}
        height={720}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        src={clip.url}
        poster={poster.url}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onPlaying={() => setReady(true)}
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

/** Reduced-motion fallback: the still, then the console — no choreography. */
function StaticOpening() {
  return (
    <>
      <section className="relative z-10 h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={poster.url}
          alt="A founder sipping tea at an ocean-side cafe at golden hour"
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </section>
      <section className="relative z-10 px-4 pt-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl leading-[1.05] font-semibold text-balance-tight sm:text-5xl">
            Run your software company without running it.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            The autonomous operating system for SaaS founders.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a href="#think" className="btn-primary px-5 py-2.5 text-sm">
              Experience Opezeni
            </a>
            <Link to="/book" className="btn-secondary px-5 py-2.5 text-sm">
              Book Discovery Call
            </Link>
          </div>
        </div>
      </section>
      <HeroDashboard />
    </>
  );
}
