import { AgreementAnalysis } from "@/types/agreement";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, GitBranch, Users, Zap } from "lucide-react";

interface WorkflowTabProps {
  analysis: AgreementAnalysis;
}

const stepTypeColors = {
  trigger: "bg-green-100 text-green-800 border-green-300",
  system_task: "bg-blue-100 text-blue-800 border-blue-300",
  human_task: "bg-purple-100 text-purple-800 border-purple-300",
  approval: "bg-orange-100 text-orange-800 border-orange-300",
  recurring: "bg-cyan-100 text-cyan-800 border-cyan-300",
  decision: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

export const WorkflowTab = ({ analysis }: WorkflowTabProps) => {
  const { workflow_json } = analysis;

  return (
    <div className="space-y-6">
      {/* Workflow Overview */}
      <Card className="p-6 bg-gradient-primary text-primary-foreground">
        <h3 className="text-2xl font-bold mb-2">{workflow_json.name}</h3>
        {workflow_json.description && (
          <p className="opacity-90">{workflow_json.description}</p>
        )}
      </Card>

      {/* Triggers */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-lg font-semibold">Triggers</h3>
        </div>
        <div className="grid gap-3">
          {workflow_json.triggers.map((trigger, idx) => (
            <div key={idx} className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-start gap-3">
                <Play className="w-5 h-5 text-accent mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">{trigger.event}</p>
                  <p className="text-sm text-muted-foreground mt-1">→ {trigger.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Steps */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Play className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Workflow Steps</h3>
        </div>
        <div className="space-y-4">
          {workflow_json.steps.map((step, idx) => (
            <div key={step.id} className="relative">
              {idx > 0 && (
                <div className="absolute left-6 -top-4 w-0.5 h-4 bg-border" />
              )}
              <div className="p-4 bg-secondary/50 rounded-lg space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{step.name}</h4>
                        <Badge className={stepTypeColors[step.type]}>{step.type.replace('_', ' ')}</Badge>
                      </div>
                      {step.description && (
                        <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      )}
                      {step.assignee_role && (
                        <p className="text-sm">
                          <span className="text-muted-foreground">Assigned to:</span>{" "}
                          <span className="font-medium">{step.assignee_role}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {(step.input_fields || step.output_fields || step.linked_obligations) && (
                  <div className="pl-15 space-y-2 text-sm">
                    {step.input_fields && step.input_fields.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Inputs: </span>
                        <span>{step.input_fields.join(", ")}</span>
                      </div>
                    )}
                    {step.output_fields && step.output_fields.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Outputs: </span>
                        <span>{step.output_fields.join(", ")}</span>
                      </div>
                    )}
                    {step.linked_obligations && step.linked_obligations.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Obligations: </span>
                        {step.linked_obligations.map((id) => (
                          <Badge key={id} variant="outline" className="mr-1">{id}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {step.next_step_ids && step.next_step_ids.length > 0 && (
                  <div className="pl-15 pt-2 border-t">
                    <span className="text-xs text-muted-foreground">
                      Next: {step.next_step_ids.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Branches */}
      {workflow_json.branches.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <GitBranch className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">Conditional Branches</h3>
          </div>
          <div className="grid gap-3">
            {workflow_json.branches.map((branch, idx) => (
              <div key={idx} className="p-4 bg-secondary/50 rounded-lg">
                <p className="font-medium text-accent">{branch.condition}</p>
                {branch.description && (
                  <p className="text-sm text-muted-foreground mt-1">{branch.description}</p>
                )}
                {(branch.from_step_id || branch.to_step_id) && (
                  <div className="flex gap-4 mt-2 text-sm">
                    {branch.from_step_id && (
                      <span><span className="text-muted-foreground">From:</span> {branch.from_step_id}</span>
                    )}
                    {branch.to_step_id && (
                      <span><span className="text-muted-foreground">To:</span> {branch.to_step_id}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Permissions */}
      {workflow_json.permissions && workflow_json.permissions.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Permissions</h3>
          </div>
          <div className="grid gap-3">
            {workflow_json.permissions.map((permission, idx) => (
              <div key={idx} className="p-4 bg-secondary/50 rounded-lg">
                <p className="font-semibold mb-2">{permission.role}</p>
                <div className="flex flex-wrap gap-1">
                  {permission.allowed_actions.map((action, actionIdx) => (
                    <Badge key={actionIdx} variant="secondary">{action}</Badge>
                  ))}
                </div>
                {permission.scope && (
                  <p className="text-sm text-muted-foreground mt-2">Scope: {permission.scope}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
