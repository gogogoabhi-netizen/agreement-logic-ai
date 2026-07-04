import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "70%", label: "Faster agreement cycle times" },
  { value: "10k+", label: "Obligations tracked per tenant" },
  { value: "100%", label: "Audit-ready workflow history" },
];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/25 blur-[140px]"
      />

      <div className="container relative grid items-center gap-14 pb-20 pt-32 lg:grid-cols-2 lg:pb-28 lg:pt-40">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/85 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--electric-bright))]" />
            Native ServiceNow &amp; Workday integrations
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            The Enterprise AI{" "}
            <span className="text-gradient-electric">Agreement Workflow</span>{" "}
            Copilot
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Pactly turns every contract into a governed, automated workflow —
            AI extraction on intake, Maestro orchestration across teams, and
            continuous obligation tracking. Deployed natively inside
            ServiceNow and Workday, where your enterprise already works.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground shadow-glow hover:bg-accent/90"
            >
              <a href="#contact">
                Book a Demo
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-bold sm:text-3xl">{stat.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-white/60 sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-lg">
            <img
              src="/contract-workflow-hero.jpg"
              alt="Dark analytics dashboard visualizing agreement workflow data"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(219,55%,12%)]/70 via-transparent to-transparent" aria-hidden />
          </div>

          {/* Floating status card */}
          <div className="absolute -bottom-6 -left-8 w-64 rounded-xl border border-white/10 bg-[hsl(219,45%,15%)]/95 p-4 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Maestro Orchestration
            </p>
            <div className="mt-3 space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-white/85">AI extraction complete</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-white/85">Legal review — in progress</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-white/25" />
                <span className="text-white/50">Obligations scheduled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
