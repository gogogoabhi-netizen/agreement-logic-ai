import { Card } from "@/components/ui/card";
import { Users, GitBranch, Plug } from "lucide-react";

export const FeatureTeasers = () => {
  const features = [
    {
      icon: Users,
      title: "Entity Extraction",
      description: "Automatically identify parties, obligations, SLAs, and critical dates.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: GitBranch,
      title: "Workflow Generation",
      description: "Create executable workflows with steps, triggers, and approvals.",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Plug,
      title: "Smart Integrations",
      description: "Map contract data to systems like Salesforce, Workday, and ServiceNow.",
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {features.map((feature, idx) => (
        <Card key={idx} className="p-6 bg-gradient-card hover:shadow-md transition-shadow">
          <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
            <feature.icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
};
