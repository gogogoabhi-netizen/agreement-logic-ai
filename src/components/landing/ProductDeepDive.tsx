import { Plug, GitBranch, ShieldCheck, Check } from "lucide-react";

const features = [
  {
    icon: Plug,
    eyebrow: "Interoperability",
    title: "MCP-native by design",
    description:
      "Pactly speaks Model Context Protocol out of the box. Your AI agents, copilots, and internal tools query agreement data and trigger workflows through a standard, governed interface — no brittle point-to-point integrations.",
    points: [
      "Native ServiceNow and Workday connectors, deployed in days",
      "MCP endpoints for agreement search, extraction, and workflow actions",
      "Open APIs and webhooks for the rest of your stack",
    ],
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Abstract blue three-dimensional network structure representing connected systems",
  },
  {
    icon: GitBranch,
    eyebrow: "Orchestration",
    title: "The proprietary Maestro framework",
    description:
      "Maestro is Pactly's multi-step orchestration engine. It composes AI extraction, human approvals, and system actions into a single governed pipeline — with conditional branching, parallel review lanes, SLAs, and automatic escalation.",
    points: [
      "Declarative workflow definitions your ops team can own",
      "Human-in-the-loop checkpoints at every consequential step",
      "Real-time visibility into every agreement's exact stage",
    ],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Glowing blue network of connected nodes across a dark globe",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Compliance",
    title: "Enterprise-scale compliance, by default",
    description:
      "Every extraction, approval, and edit is versioned and attributable. Obligations carry owners and deadlines, and the full history is queryable — so audit season is a report, not a project.",
    points: [
      "SSO/SAML, role-based access, and tenant-level data isolation",
      "Immutable audit logs across the full agreement lifecycle",
      "Obligation and renewal tracking with proactive alerting",
    ],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Dark enterprise data center aisle with illuminated server racks",
  },
];

export const ProductDeepDive = () => {
  return (
    <section id="platform" className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            The Platform
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Infrastructure-grade agreement automation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three capabilities that separate Pactly from legacy contract
            lifecycle tools.
          </p>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-24">
          {features.map(({ icon: Icon, eyebrow, title, description, points, image, imageAlt }, index) => (
            <div
              key={title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  <Icon className="h-3.5 w-3.5" />
                  {eyebrow}
                </div>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
                <ul className="mt-6 space-y-3">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-foreground/80">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-lg">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
