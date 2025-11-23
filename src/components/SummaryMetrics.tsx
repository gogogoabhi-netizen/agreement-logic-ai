import { AgreementAnalysis } from "@/types/agreement";
import { Card } from "@/components/ui/card";
import { Users, CheckSquare, Target, AlertTriangle } from "lucide-react";

interface SummaryMetricsProps {
  analysis: AgreementAnalysis;
}

export const SummaryMetrics = ({ analysis }: SummaryMetricsProps) => {
  const metrics = [
    {
      label: "Parties",
      value: analysis.entities.parties.length,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Obligations",
      value: analysis.entities.obligations.length,
      icon: CheckSquare,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "SLAs",
      value: analysis.entities.slas.length,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Risks",
      value: analysis.risks.length,
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <Card key={idx} className="p-4 bg-gradient-card">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
