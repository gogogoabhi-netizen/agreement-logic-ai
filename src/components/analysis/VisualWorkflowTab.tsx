import { useState } from "react";
import { AgreementAnalysis } from "@/types/agreement";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, ArrowDown, Edit, GitBranch, Play, CheckCircle, Clock, User, AlertCircle, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VisualWorkflowTabProps {
  analysis: AgreementAnalysis;
}

type WorkflowStep = AgreementAnalysis["workflow_json"]["steps"][0];

const stepTypeConfig = {
  trigger: { color: "bg-chart-1/20 text-chart-1 border-chart-1", icon: Play, label: "Trigger" },
  system_task: { color: "bg-chart-2/20 text-chart-2 border-chart-2", icon: GitBranch, label: "System Task" },
  human_task: { color: "bg-chart-3/20 text-chart-3 border-chart-3", icon: User, label: "Human Task" },
  approval: { color: "bg-chart-4/20 text-chart-4 border-chart-4", icon: CheckCircle, label: "Approval" },
  recurring: { color: "bg-chart-5/20 text-chart-5 border-chart-5", icon: Clock, label: "Recurring" },
  decision: { color: "bg-primary/20 text-primary border-primary", icon: AlertCircle, label: "Decision" },
};

export const VisualWorkflowTab = ({ analysis }: VisualWorkflowTabProps) => {
  const { workflow_json } = analysis;
  
  const [steps, setSteps] = useState<WorkflowStep[]>(workflow_json.steps);
  const [editingStep, setEditingStep] = useState<WorkflowStep | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  // Editing state
  const [editForm, setEditForm] = useState({
    name: "",
    type: "system_task" as WorkflowStep["type"],
    assignee_role: "",
    description: "",
    linked_obligations: "",
  });

  const moveStepUp = (index: number) => {
    if (index === 0) return;
    const newSteps = [...steps];
    [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
    setSteps(newSteps);
    toast({
      title: "Step moved up",
      description: "Workflow order updated",
    });
  };

  const moveStepDown = (index: number) => {
    if (index === steps.length - 1) return;
    const newSteps = [...steps];
    [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    setSteps(newSteps);
    toast({
      title: "Step moved down",
      description: "Workflow order updated",
    });
  };

  const openEditDrawer = (step: WorkflowStep) => {
    setEditingStep(step);
    setEditForm({
      name: step.name,
      type: step.type,
      assignee_role: step.assignee_role || "",
      description: step.description || "",
      linked_obligations: step.linked_obligations?.join(", ") || "",
    });
    setIsEditDrawerOpen(true);
  };

  const saveEdit = () => {
    if (!editingStep) return;
    
    const updatedSteps = steps.map((step) =>
      step.id === editingStep.id
        ? {
            ...step,
            name: editForm.name,
            type: editForm.type,
            assignee_role: editForm.assignee_role || undefined,
            description: editForm.description || undefined,
            linked_obligations: editForm.linked_obligations
              ? editForm.linked_obligations.split(",").map((s) => s.trim()).filter(Boolean)
              : undefined,
          }
        : step
    );
    
    setSteps(updatedSteps);
    setIsEditDrawerOpen(false);
    setEditingStep(null);
    
    toast({
      title: "Step updated",
      description: "Changes saved successfully",
    });
  };

  const exportWorkflow = () => {
    const workflowData = {
      ...workflow_json,
      steps,
    };
    
    const blob = new Blob([JSON.stringify(workflowData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "maestro-workflow.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Workflow exported",
      description: "maestro-workflow.json downloaded",
    });
  };

  const getStepName = (stepId?: string) => {
    if (!stepId) return "Unknown";
    const step = steps.find((s) => s.id === stepId);
    return step?.name || stepId;
  };

  if (!steps || steps.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <GitBranch className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="text-lg font-semibold">No workflow steps found</h3>
          <p className="text-muted-foreground">
            Try analyzing a more detailed agreement or add steps manually (future enhancement).
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Summary */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{workflow_json.name}</h3>
            {workflow_json.description && (
              <p className="text-muted-foreground">{workflow_json.description}</p>
            )}
          </div>
          <Button onClick={exportWorkflow} variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export JSON
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1">
            {steps.length} {steps.length === 1 ? "step" : "steps"}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            {workflow_json.triggers?.length || 0} {workflow_json.triggers?.length === 1 ? "trigger" : "triggers"}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            {workflow_json.branches?.length || 0} {workflow_json.branches?.length === 1 ? "branch" : "branches"}
          </Badge>
        </div>

        {/* Triggers */}
        {workflow_json.triggers && workflow_json.triggers.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
              <Play className="w-4 h-4" />
              Workflow Triggers
            </h4>
            <div className="space-y-2">
              {workflow_json.triggers.map((trigger, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground">•</span>
                  <div>
                    <span className="font-medium">{trigger.event}</span>
                    <span className="text-muted-foreground"> → {trigger.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Step List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Workflow Steps</h3>
        
        {steps.map((step, index) => {
          const config = stepTypeConfig[step.type] || stepTypeConfig.system_task;
          const Icon = config.icon;

          return (
            <Card key={step.id} className="p-4">
              <div className="flex gap-4">
                {/* Step Number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={`gap-1 border ${config.color}`}>
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </Badge>
                      <h4 className="font-semibold">{step.name}</h4>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveStepUp(index)}
                        disabled={index === 0}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveStepDown(index)}
                        disabled={index === steps.length - 1}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDrawer(step)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {step.assignee_role && (
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Assignee:</span> {step.assignee_role}
                    </p>
                  )}

                  {step.description && (
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  )}

                  {step.linked_obligations && step.linked_obligations.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {step.linked_obligations.map((obl) => (
                        <Badge key={obl} variant="secondary" className="text-xs">
                          {obl}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Branches Section */}
      {workflow_json.branches && workflow_json.branches.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Conditional Branches
          </h3>
          
          <div className="space-y-3">
            {workflow_json.branches.map((branch, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-warning">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="border-warning text-warning">
                      Condition
                    </Badge>
                    <p className="font-medium flex-1">{branch.condition}</p>
                  </div>
                  
                  {branch.from_step_id && branch.to_step_id && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pl-2">
                      <span className="font-medium">{getStepName(branch.from_step_id)}</span>
                      <span>→</span>
                      <span className="font-medium">{getStepName(branch.to_step_id)}</span>
                    </div>
                  )}
                  
                  {branch.description && (
                    <p className="text-sm text-muted-foreground pl-2">{branch.description}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Edit Drawer */}
      <Sheet open={isEditDrawerOpen} onOpenChange={setIsEditDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Workflow Step</SheetTitle>
            <SheetDescription>
              Update the step properties below. Changes will be saved to the workflow.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="step-name">Step Name</Label>
              <Input
                id="step-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Enter step name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="step-type">Step Type</Label>
              <Select
                value={editForm.type}
                onValueChange={(value) => setEditForm({ ...editForm, type: value as WorkflowStep["type"] })}
              >
                <SelectTrigger id="step-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trigger">Trigger</SelectItem>
                  <SelectItem value="system_task">System Task</SelectItem>
                  <SelectItem value="human_task">Human Task</SelectItem>
                  <SelectItem value="approval">Approval</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                  <SelectItem value="decision">Decision</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee-role">Assignee Role</Label>
              <Input
                id="assignee-role"
                value={editForm.assignee_role}
                onChange={(e) => setEditForm({ ...editForm, assignee_role: e.target.value })}
                placeholder="e.g., Legal, Sales Ops"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Describe what this step does"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linked-obligations">Linked Obligations</Label>
              <Input
                id="linked-obligations"
                value={editForm.linked_obligations}
                onChange={(e) => setEditForm({ ...editForm, linked_obligations: e.target.value })}
                placeholder="e.g., OBL-001, OBL-002"
              />
              <p className="text-xs text-muted-foreground">
                Enter obligation IDs separated by commas
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={saveEdit} className="flex-1">
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditDrawerOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
