import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CinematicOpening } from "@/components/site/CinematicOpening";
import { ThinkSection } from "@/components/site/ThinkSection";
import { CompanyMap } from "@/components/site/CompanyMap";
import { Simulations } from "@/components/site/Simulations";
import { SimulateCompany } from "@/components/site/SimulateCompany";
import { OperatorChairman } from "@/components/site/OperatorChairman";
import { Trust } from "@/components/site/Trust";
import { Architecture } from "@/components/site/Architecture";
import { FinalCTA } from "@/components/site/FinalCTA";
import type { DeptId } from "@/lib/opezeni";

const TITLE = "Opezeni — Run your software company without running it";
const DESC =
  "An autonomous operating system for SaaS founders. Specialized AI agents run marketing, support, product, hiring, finance and analytics — you move from Operator to Chairman.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  const [dept, setDept] = useState<Exclude<DeptId, "founder">>("marketing");

  const openDemo = (id: DeptId) => {
    if (id === "founder") return;
    setDept(id);
    document.getElementById("simulations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <CinematicOpening />
      <ThinkSection />
      <CompanyMap onOpenDemo={openDemo} />
      <Simulations active={dept} onChange={setDept} />
      <SimulateCompany />
      <OperatorChairman />
      <Trust />
      <Architecture compact />
      <FinalCTA />
    </>
  );
}
