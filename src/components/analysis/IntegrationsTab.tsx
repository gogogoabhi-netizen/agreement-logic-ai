import { AgreementAnalysis } from "@/types/agreement";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plug, Zap, ArrowRightLeft } from "lucide-react";

interface IntegrationsTabProps {
  analysis: AgreementAnalysis;
}

export const IntegrationsTab = ({ analysis }: IntegrationsTabProps) => {
  const { integrations } = analysis;

  return (
    <div className="space-y-6">
      {/* Systems */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Plug className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Integration Systems</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {integrations.systems.map((system, idx) => (
            <div key={idx} className="p-4 bg-secondary/50 rounded-lg space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold">{system.name}</h4>
                {system.status && (
                  <Badge 
                    variant={system.status === "Recommended" ? "default" : "secondary"}
                    className="flex-shrink-0"
                  >
                    {system.status}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{system.purpose}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-lg font-semibold">Integration Actions</h3>
        </div>
        <div className="space-y-3">
          {integrations.actions.map((action, idx) => (
            <div key={idx} className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{action.system}</Badge>
                    <span className="text-sm font-medium">{action.action}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Triggered on: <span className="text-foreground">{action.trigger}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Field Mappings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ArrowRightLeft className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Field Mappings</h3>
        </div>
        <div className="space-y-2">
          {integrations.field_mappings.map((mapping, idx) => (
            <div key={idx} className="p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{mapping.contract_field}</span>
                </div>
                <ArrowRightLeft className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{mapping.system}</Badge>
                  <span className="text-sm">{mapping.system_field}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
