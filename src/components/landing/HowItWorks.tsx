import { FileSearch, Workflow, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    step: "01",
    title: "Intake & AI Extraction",
    description:
      "Drop in any agreement — MSA, SOW, offer letter, or vendor contract. Pactly's AI parses terms, parties, dates, and clauses into structured data in seconds.",
  },
  {
    icon: Workflow,
    step: "02",
    title: "Maestro Orchestration",
    description:
      "The Maestro engine routes multi-step approvals across Legal, HR, and Procurement — with conditional branching, SLAs, and escalations built in.",
  },
  {
    icon: ShieldCheck,
    step: "03",
    title: "Compliance & Obligation Tracking",
    description:
      "Every commitment becomes a tracked obligation with owners, deadlines, and renewal alerts — backed by a complete, audit-ready workflow history.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From raw contract to governed workflow in three steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No rip-and-replace. Pactly layers intelligent automation onto the
            systems your teams already live in.
          </p>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-gradient-to-r from-accent/20 via-accent/50 to-accent/20 md:block"
          />

          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="relative flex flex-col items-center text-center md:px-4">
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-md">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <span className="mt-5 text-sm font-bold tracking-widest text-accent">
                STEP {step}
              </span>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
