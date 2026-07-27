import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MagneticButton, Reveal } from "./primitives";

export function FinalCTA() {
  return (
    <section className="relative z-10 px-4 py-32">
      <Reveal className="glass mx-auto max-w-4xl rounded-3xl px-6 py-20 text-center sm:px-12">
        
        <h2 className="mt-4 text-hero text-balance-tight">
          Ready to stop operating your company?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
          A 30-minute discovery call. We map your current decision flow and show exactly which
          loops Opezeni can take over first.
        </p>
        <div className="mt-9 flex justify-center">
          <Link to="/book">
            <MagneticButton className="btn-primary px-6 py-3.5 text-sm">
              Book Discovery Call
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
