import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Slow, living engineering grid: drifting nodes, faint connection lines and
 * particles. Purely decorative — hidden from assistive tech, frozen for users
 * who prefer reduced motion.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(14, Math.min(34, Math.round((width * height) / 55000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: ((i * 97.13) % 100) * (width / 100),
        y: ((i * 61.7) % 100) * (height / 100),
        vx: (((i % 7) - 3) / 3) * 0.045,
        vy: (((i % 5) - 2) / 2) * 0.038,
        r: 1 + (i % 3) * 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 190) {
            ctx.strokeStyle = `rgba(59,130,246,${(1 - d / 190) * 0.13})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pulse = reduced ? 0.4 : 0.32 + Math.sin(frame / 90 + n.x / 220) * 0.16;
        ctx.fillStyle = `rgba(155,163,175,${pulse * 0.55})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame += 1;
    };

    let raf = 0;
    const loop = () => {
      draw();
      raf = window.requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      draw();
    } else {
      loop();
    }
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className="absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(59,130,246,0.16), transparent 70%)",
        }}
      />
    </div>
  );
}
