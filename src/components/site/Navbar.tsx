import { Link } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { to: "/", hash: "simulate", label: "Simulate" },
  { to: "/product", label: "Product" },
  { to: "/architecture", label: "Architecture" },
  { to: "/about", label: "About" },
  { to: "/book", label: "Book Call" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={false}
        animate={{
          marginTop: scrolled ? 10 : 20,
          width: scrolled ? "min(100%, 56rem)" : "min(100%, 72rem)",
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 30 }}
        className="glass flex items-center justify-between rounded-2xl px-4 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.9)]"
      >
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo className="h-6 w-6" />
          <span className="font-display text-[15px] font-semibold tracking-tight">Opezeni</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={"hash" in l ? l.hash : undefined}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/book"
            className="hidden rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-shadow hover:glow-accent sm:inline-flex"
          >
            Book Discovery
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute top-20 w-[calc(100%-2rem)] rounded-2xl p-2 md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={"hash" in l ? l.hash : undefined}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
