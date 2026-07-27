import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { LineChart, Megaphone, LifeBuoy, Users, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import poster from "@/assets/opening-poster.jpg.asset.json";
import clip from "@/assets/opening-scene.mp4.asset.json";
import { StatusDot } from "./primitives";

const NOTIFICATIONS = [
  { icon: Megaphone, text: "Marketing Agent increased ROAS by 18%" },
  { icon: LifeBuoy, text: "Support Agent resolved 46 conversations" },
  { icon: Wallet, text: "Finance Agent updated runway forecast" },
  { icon: Users, text: "Hiring Agent scheduled final interview" },
  { icon: LineChart, text: "Revenue up 6.1% this week" },
];

const CONSOLE_METRICS = [
  { label: "Revenue", value: "$482.4k", delta: "+12.4%" },
  { label: "MRR", value: "$41.8k", delta: "+6.1%" },
  { label: "Growth", value: "18.6%", delta: "+2.3 pts" },
  { label: "Runway", value: "27 mo", delta: "+21 days" },
];

const CONSOLE_AGENTS = [
  { name: "Marketing Agent", status: "Reallocating spend" },
  { name: "Support Agent", status: "Resolving tickets" },
  { name: "Finance Agent", status: "Forecasting runway" },
  { name: "Hiring Agent", status: "Ranking candidates" },
];

/**
 * Chapter 00 — the film.
 * Golden hour beach cafe, a phone lighting up with the company running itself,
 * then a scroll-driven zoom that turns the phone screen into the live console.
 */
export function CinematicOpening() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  if (reduced) return <StaticOpening />;

  return (
    <section ref={ref} className="relative z-10 h-[300vh]" aria-label="Opezeni opening sequence">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Stage progress={scrollYProgress} />
      </div>
    </section>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const filmOpacity = useTransform(progress, [0, 0.45, 0.68], [1, 0.85, 0]);
  const filmScale = useTransform(progress, [0, 0.7], [1.06, 1.22]);
  const filmSaturate = useTransform(progress, [0.3, 0.65], [1, 0.2]);
  const filmFilter = useTransform(filmSaturate, (s) => `saturate(${s}) brightness(${0.35 + s * 0.5})`);

  const phoneWidth = useTransform(progress, [0.3, 0.72], ["248px", "min(1100px, 94vw)"]);
  const phoneHeight = useTransform(progress, [0.3, 0.72], ["510px", "min(660px, 78vh)"]);
  const bezel = useTransform(progress, [0.42, 0.6], [1, 0]);
  const bezelPad = useTransform(bezel, (b) => `${b * 10}px`);
  const notifOpacity = useTransform(progress, [0.3, 0.42], [1, 0]);
  const consoleOpacity = useTransform(progress, [0.44, 0.6], [0, 1]);
  const captionOpacity = useTransform(progress, [0, 0.12, 0.26], [1, 1, 0]);
  const outroOpacity = useTransform(progress, [0.74, 0.86], [0, 1]);

  return (
    <div className="relative h-full w-full">

      {/* film */}
      <motion.div style={{ opacity: filmOpacity, scale: filmScale, filter: filmFilter }} className="absolute inset-0">
        <Film />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />

      {/* opening caption */}
      <motion.div
        style={{ opacity: captionOpacity }}
        className="absolute inset-x-0 top-[22vh] px-6 text-center"
      >
        <p className="mono-label">Tuesday, 6:41 PM — somewhere with better light</p>
        <p className="mx-auto mt-3 max-w-md font-display text-lg font-medium text-foreground/90 sm:text-xl">
          The company is running. He isn't.
        </p>
      </motion.div>

      {/* phone → console */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          style={{ width: phoneWidth, height: phoneHeight, padding: bezelPad }}
          className="relative rounded-[2.2rem] bg-[#0b0e13] shadow-[0_60px_160px_-40px_rgba(0,0,0,1)]"
        >
          <motion.div
            style={{ opacity: bezel }}
            className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-white/15"
          />
          <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] border border-border bg-surface">
            <motion.div style={{ opacity: notifOpacity }} className="absolute inset-0">
              <PhoneScreen />
            </motion.div>
            <motion.div style={{ opacity: consoleOpacity }} className="absolute inset-0">
              <ConsoleScreen />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.p
        style={{ opacity: outroOpacity }}
        className="absolute inset-x-0 bottom-14 px-6 text-center mono-label"
      >
        You are now inside Opezeni
      </motion.p>
    </motion.div>
  );
}

function Film() {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => undefined);
  }, []);

  return (
    <>
      <img
        src={poster.url}
        alt="A founder relaxing at a beach cafe at golden hour, phone face down on the table"
        width={1920}
        height={1088}
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
        preload="metadata"
        onPlaying={() => setReady(true)}
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

function PhoneScreen() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted-foreground">18:41</span>
        <span className="font-mono text-[10px] text-muted-foreground">Opezeni</span>
      </div>

      <div className="mt-6 space-y-2 overflow-hidden">
        {NOTIFICATIONS.map((n, i) => (
          <motion.div
            key={n.text}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-2.5 rounded-xl border border-border bg-card/90 px-3 py-2.5"
          >
            <n.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            <p className="text-[11px] leading-snug text-foreground/90">{n.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-4">
        <StatusDot tone="success" />
        <span className="font-mono text-[10px] text-muted-foreground">
          6 agents operating · 0 waiting on you
        </span>
      </div>
    </div>
  );
}

function ConsoleScreen() {
  return (
    <div className="flex h-full flex-col p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusDot tone="success" />
          <span className="mono-label">Opezeni console — live</span>
        </div>
        <span className="mono-label hidden sm:inline">Autonomy 94%</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {CONSOLE_METRICS.map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-card/70 p-3">
            <p className="text-[10px] text-muted-foreground">{m.label}</p>
            <p className="mt-1 font-display text-base font-semibold">{m.value}</p>
            <p className="text-[10px] font-medium text-[color:var(--success)]">{m.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid flex-1 gap-2.5 overflow-hidden sm:grid-cols-2">
        {CONSOLE_AGENTS.map((a) => (
          <div
            key={a.name}
            className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-3 py-2.5"
          >
            <StatusDot tone="success" />
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium">{a.name}</p>
              <p className="truncate text-[10px] text-muted-foreground">{a.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Reduced-motion fallback: the still, the notifications, no scroll choreography. */
function StaticOpening() {
  return (
    <section className="relative z-10 h-[70vh] min-h-[520px] overflow-hidden">
      <img
        src={poster.url}
        alt="A founder relaxing at a beach cafe at golden hour, phone face down on the table"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="h-[440px] w-[248px] overflow-hidden rounded-[1.6rem] border border-border bg-surface">
          <PhoneScreen />
        </div>
      </div>
    </section>
  );
}
