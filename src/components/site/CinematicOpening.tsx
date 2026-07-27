import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
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
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const [size, setSize] = useState({ w: 1280, h: 900 });

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const measure = () => setSize({ w: window.innerWidth, h: window.innerHeight });
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
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      onScroll();
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [progress, reduced]);

  if (reduced) return <StaticOpening />;

  return (
    <section ref={ref} className="relative z-10 h-[300vh]" aria-label="Opezeni opening sequence">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Stage progress={progress} viewport={size} />
      </div>
    </section>
  );
}

function Stage({
  progress,
  viewport,
}: {
  progress: MotionValue<number>;
  viewport: { w: number; h: number };
}) {
  const filmOpacity = useTransform(progress, [0, 0.45, 0.68], [1, 0.85, 0]);
  const filmScale = useTransform(progress, [0, 0.7], [1.06, 1.22]);
  const filmSaturate = useTransform(progress, [0.3, 0.65], [1, 0.2]);
  const filmFilter = useTransform(filmSaturate, (s) => `saturate(${s}) brightness(${0.35 + s * 0.5})`);

  const wideW = Math.min(1100, viewport.w * 0.94);
  const wideH = Math.min(660, viewport.h * 0.78);
  const smallH = Math.min(510, viewport.h * 0.62);
  const phoneWidth = useTransform(progress, [0.3, 0.72], [248, wideW]);
  const phoneHeight = useTransform(progress, [0.3, 0.72], [smallH, wideH]);
  // pick-up beat: the phone lies low and tilted on the table, then lifts and squares up
  const phoneY = useTransform(progress, [0, 0.14, 0.3], [110, 96, 0]);
  const phoneRotate = useTransform(progress, [0, 0.14, 0.3], [-9, -8, 0]);
  const phoneTilt = useTransform(progress, [0, 0.14, 0.3], [26, 22, 0]);
  const phonePerspective = useTransform(
    phoneTilt,
    (t) => `perspective(1400px) rotateX(${t}deg)`,
  );
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
    </div>
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

      <div className="mt-3 grid content-start gap-2.5 overflow-hidden sm:grid-cols-2">
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

      <div className="mt-3 flex-1 overflow-hidden rounded-xl border border-border bg-card/50 p-3">
        <p className="mono-label">Decision log</p>
        <ul className="mt-2 space-y-1.5">
          {NOTIFICATIONS.map((n) => (
            <li
              key={n.text}
              className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground"
            >
              <n.icon className="h-3 w-3 shrink-0 text-primary" aria-hidden />
              <span className="truncate">{n.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <StatusDot tone="success" />
        <span className="font-mono text-[10px] text-muted-foreground">
          6 agents operating · 0 waiting on you
        </span>
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
