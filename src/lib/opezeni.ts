import {
  Megaphone,
  LifeBuoy,
  Users,
  Wallet,
  Boxes,
  LineChart,
  Handshake,
  Crown,
  type LucideIcon,
} from "lucide-react";

export type DeptId =
  | "marketing"
  | "support"
  | "hiring"
  | "finance"
  | "product"
  | "analytics"
  | "sales"
  | "founder";

export type Dept = {
  id: DeptId;
  name: string;
  icon: LucideIcon;
  status: string;
  responsibilities: string[];
  summary: string;
};

export const DEPARTMENTS: Dept[] = [
  {
    id: "marketing",
    name: "Marketing Agent",
    icon: Megaphone,
    status: "Running campaigns",
    summary: "Reallocates spend toward channels that actually convert.",
    responsibilities: [
      "Channel budget allocation",
      "Creative testing and rotation",
      "Lifecycle and email sequences",
      "ROAS and CAC guardrails",
    ],
  },
  {
    id: "support",
    name: "Support Agent",
    icon: LifeBuoy,
    status: "Handling tickets",
    summary: "Resolves conversations end to end and escalates only true edge cases.",
    responsibilities: [
      "Tier 1 and tier 2 resolution",
      "Refunds within policy",
      "Bug triage into the backlog",
      "CSAT monitoring",
    ],
  },
  {
    id: "hiring",
    name: "Hiring Agent",
    icon: Users,
    status: "Scheduling interviews",
    summary: "Sources, screens and ranks candidates against the actual role scorecard.",
    responsibilities: [
      "Sourcing and outreach",
      "Structured screening",
      "Scorecard ranking",
      "Interview scheduling",
    ],
  },
  {
    id: "finance",
    name: "Finance Agent",
    icon: Wallet,
    status: "Optimizing cashflow",
    summary: "Forecasts runway continuously and flags spend before it compounds.",
    responsibilities: [
      "Runway forecasting",
      "Vendor and subscription audit",
      "Invoice and dunning flows",
      "Monthly close preparation",
    ],
  },
  {
    id: "product",
    name: "Product Agent",
    icon: Boxes,
    status: "Reviewing roadmap",
    summary: "Prioritizes the roadmap from evidence, not from the loudest request.",
    responsibilities: [
      "Feedback clustering",
      "Impact and effort scoring",
      "Spec drafting",
      "Release notes",
    ],
  },
  {
    id: "analytics",
    name: "Analytics Agent",
    icon: LineChart,
    status: "Detecting churn",
    summary: "Watches every cohort and surfaces the accounts about to leave.",
    responsibilities: [
      "Churn risk scoring",
      "Cohort retention analysis",
      "Anomaly detection",
      "Weekly chairman brief",
    ],
  },
  {
    id: "sales",
    name: "Sales Agent",
    icon: Handshake,
    status: "Working pipeline",
    summary: "Qualifies inbound, sequences follow-ups and keeps the CRM honest.",
    responsibilities: [
      "Lead qualification",
      "Follow-up sequencing",
      "Pipeline hygiene",
      "Expansion signals",
    ],
  },
  {
    id: "founder",
    name: "Founder",
    icon: Crown,
    status: "Chairman",
    summary: "Sets direction, approves exceptions, reads the summary. Nothing else.",
    responsibilities: ["Vision and strategy", "Exception approval", "Capital", "Culture"],
  },
];

export const DEPT_MAP = Object.fromEntries(DEPARTMENTS.map((d) => [d.id, d])) as Record<
  DeptId,
  Dept
>;

export const INTEGRATIONS = [
  "Slack",
  "GitHub",
  "Stripe",
  "HubSpot",
  "Linear",
  "Notion",
  "Google Ads",
  "Meta Ads",
  "CRM",
];
