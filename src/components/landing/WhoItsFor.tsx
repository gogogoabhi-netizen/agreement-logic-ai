import { Scale, Users, PackageSearch, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const personas = [
  {
    icon: Scale,
    title: "Legal Operations",
    subtitle: "Own the contract lifecycle without owning the busywork.",
    points: [
      "Automated clause extraction and risk flagging on intake",
      "Standardized playbooks enforced across every matter",
      "Complete audit trails for outside counsel and regulators",
    ],
  },
  {
    icon: Users,
    title: "HR Operations",
    subtitle: "Employment agreements that keep pace with your workforce.",
    points: [
      "Offer letters and policy acknowledgements routed via Workday",
      "Obligation tracking for benefits, equity, and compliance dates",
      "Consistent terms across regions, entities, and job families",
    ],
  },
  {
    icon: PackageSearch,
    title: "Procurement Directors",
    subtitle: "Vendor agreements with visibility from intake to renewal.",
    points: [
      "Supplier onboarding orchestrated natively in ServiceNow",
      "Renewal and price-escalation alerts before they cost you",
      "Spend-linked obligation dashboards across the vendor base",
    ],
  },
];

export const WhoItsFor = () => {
  return (
    <section id="who-its-for" className="scroll-mt-20 bg-secondary py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Who It's For
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for the teams that own enterprise agreements
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Purpose-built workflows for organizations of 500 to 10,000
            employees — no generic CLM bloat.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {personas.map(({ icon: Icon, title, subtitle, points }) => (
            <Card
              key={title}
              className="group border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="flex h-full flex-col p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-muted-foreground">{subtitle}</p>
                <ul className="mt-6 space-y-3 border-t border-border pt-6">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
