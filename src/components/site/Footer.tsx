import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/80 px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6" />
            <span className="font-display text-base font-semibold">Opezeni</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The autonomous operating system for SaaS founders. Operator to Chairman.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-14 gap-y-2 text-sm sm:grid-cols-3">
          <Link className="text-muted-foreground hover:text-foreground" to="/product">
            Product
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" to="/architecture">
            Architecture
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" to="/about">
            About
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" to="/book">
            Book a call
          </Link>
        </nav>
      </div>
      <p className="mono-label mx-auto mt-12 max-w-6xl">
        © {new Date().getFullYear()} Opezeni — Run your software company without running it.
      </p>
    </footer>
  );
}
