import { AgreementAnalysis } from "@/types/agreement";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckSquare, Package, Target, Calendar, Shield, Database } from "lucide-react";

interface EntitiesTabProps {
  analysis: AgreementAnalysis;
}

export const EntitiesTab = ({ analysis }: EntitiesTabProps) => {
  const { entities } = analysis;

  return (
    <div className="space-y-6">
      {/* Parties */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Parties</h3>
        </div>
        <div className="grid gap-3">
          {entities.parties.map((party, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{party.name}</p>
                {party.role && <p className="text-sm text-muted-foreground">{party.role}</p>}
                {party.contact && (
                  <p className="text-sm text-muted-foreground mt-1">{party.contact}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Obligations */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent/10 rounded-lg">
            <CheckSquare className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-lg font-semibold">Obligations</h3>
        </div>
        <div className="grid gap-3">
          {entities.obligations.map((obligation) => (
            <div key={obligation.id} className="p-4 bg-secondary/50 rounded-lg space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">{obligation.id}</Badge>
                  <p className="text-sm">{obligation.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>Responsible: <span className="font-medium text-foreground">{obligation.responsible}</span></span>
                {obligation.deadline && <span>Deadline: {obligation.deadline}</span>}
                {obligation.frequency && <span>Frequency: {obligation.frequency}</span>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Deliverables */}
      {entities.deliverables.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Deliverables</h3>
          </div>
          <div className="grid gap-3">
            {entities.deliverables.map((deliverable, idx) => (
              <div key={idx} className="p-3 bg-secondary/50 rounded-lg">
                <p className="font-medium">{deliverable.name}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                  {deliverable.due_date && <span>Due: {deliverable.due_date}</span>}
                  {deliverable.format && <span>Format: {deliverable.format}</span>}
                  {deliverable.owner && <span>Owner: {deliverable.owner}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* SLAs */}
      {entities.slas.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">Service Level Agreements</h3>
          </div>
          <div className="grid gap-3">
            {entities.slas.map((sla, idx) => (
              <div key={idx} className="p-4 bg-secondary/50 rounded-lg space-y-2">
                {sla.id && <Badge variant="outline">{sla.id}</Badge>}
                <p className="font-medium">{sla.metric}</p>
                <p className="text-accent font-semibold">Target: {sla.target}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {sla.measurement && <span>Measured: {sla.measurement}</span>}
                  {sla.penalty && <span className="text-destructive">Penalty: {sla.penalty}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Renewals */}
      {entities.renewals.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Renewals</h3>
          </div>
          <div className="grid gap-3">
            {entities.renewals.map((renewal, idx) => (
              <div key={idx} className="p-3 bg-secondary/50 rounded-lg space-y-2">
                {renewal.date && <p><span className="text-muted-foreground">Date:</span> <span className="font-medium">{renewal.date}</span></p>}
                {renewal.notice_period && <p><span className="text-muted-foreground">Notice Period:</span> {renewal.notice_period}</p>}
                {renewal.auto_renew !== undefined && (
                  <Badge variant={renewal.auto_renew ? "default" : "secondary"}>
                    {renewal.auto_renew ? "Auto-Renew" : "Manual Renewal"}
                  </Badge>
                )}
                {renewal.special_terms && <p className="text-sm text-muted-foreground">{renewal.special_terms}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Approvals */}
      {entities.approvals.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">Approvals</h3>
          </div>
          <div className="grid gap-3">
            {entities.approvals.map((approval, idx) => (
              <div key={idx} className="p-3 bg-secondary/50 rounded-lg">
                <p className="font-medium">{approval.item}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Approver: <span className="text-foreground">{approval.approver}</span>
                </p>
                {approval.threshold && (
                  <p className="text-sm text-muted-foreground">Threshold: {approval.threshold}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Data Fields */}
      {entities.data_fields.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Data Fields</h3>
          </div>
          <div className="grid gap-2">
            {entities.data_fields.map((field, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                <span className="text-sm font-medium">{field.name}</span>
                <div className="flex items-center gap-2">
                  {field.type && <Badge variant="secondary" className="text-xs">{field.type}</Badge>}
                  {field.value && <span className="text-sm text-muted-foreground">{field.value}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
