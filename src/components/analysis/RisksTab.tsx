import { AgreementAnalysis } from "@/types/agreement";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info, FileText } from "lucide-react";

interface RisksTabProps {
  analysis: AgreementAnalysis;
}

const severityConfig = {
  high: { icon: AlertTriangle, color: "text-destructive", bgColor: "bg-destructive/10" },
  medium: { icon: AlertCircle, color: "text-orange-600", bgColor: "bg-orange-100" },
  low: { icon: Info, color: "text-blue-600", bgColor: "bg-blue-100" },
};

export const RisksTab = ({ analysis }: RisksTabProps) => {
  const { risks, notes } = analysis;

  return (
    <div className="space-y-6">
      {/* Risks */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-destructive/10 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold">Risk Assessment</h3>
        </div>
        <div className="space-y-3">
          {risks.map((risk, idx) => {
            const config = severityConfig[risk.severity];
            const Icon = config.icon;
            
            return (
              <div key={idx} className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${config.bgColor} rounded-lg flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant={risk.severity === "high" ? "destructive" : "secondary"}
                        className="capitalize"
                      >
                        {risk.severity} Risk
                      </Badge>
                      {risk.category && (
                        <Badge variant="outline">{risk.category}</Badge>
                      )}
                    </div>
                    <p className="text-sm">{risk.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Analysis Notes */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Analysis Summary</h3>
        </div>
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground whitespace-pre-wrap">{notes}</p>
        </div>
      </Card>
    </div>
  );
};
