import { Link } from "@tanstack/react-router";
import { Mail, Phone, Linkedin, X } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/80 px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.25fr_1fr_1fr]">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6" />
            <span className="font-display text-base font-semibold">Opezeni</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The autonomous operating system for SaaS founders. Operator to Chairman.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3 md:grid-cols-2">
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

        <div className="flex flex-col gap-3 text-sm">
          <a
            href="mailto:nestcy770@gmail.com"
            className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span>nestcy770@gmail.com</span>
          </a>
          <a
            href="tel:+260973732409"
            className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span>+260 973 732 409 / 076 791 8627</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ernest-zimba-904661318/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BUX48%2BDdoQSqjabnIwaoyRA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground"
          >
            <Linkedin className="h-4 w-4 shrink-0" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://x.com/ernestzimba__"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 shrink-0" />
            <span>Ernest Zimba (@ernestzimba__)</span>
          </a>
        </div>
      </div>
      <p className="mono-label mx-auto mt-12 max-w-6xl">
        © {new Date().getFullYear()} Opezeni — Run your software company without running it.
      </p>
    </footer>
  );
}
