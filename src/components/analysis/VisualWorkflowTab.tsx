import { useCallback, useMemo, useState } from "react";
import { AgreementAnalysis } from "@/types/agreement";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitBranch, Play, CheckCircle, Clock, User, AlertCircle } from "lucide-react";

interface VisualWorkflowTabProps {
  analysis: AgreementAnalysis;
}

const stepTypeConfig = {
  trigger: { color: "hsl(var(--chart-1))", icon: Play, label: "Trigger" },
  system_task: { color: "hsl(var(--chart-2))", icon: GitBranch, label: "System Task" },
  human_task: { color: "hsl(var(--chart-3))", icon: User, label: "Human Task" },
  approval: { color: "hsl(var(--chart-4))", icon: CheckCircle, label: "Approval" },
  recurring: { color: "hsl(var(--chart-5))", icon: Clock, label: "Recurring" },
  decision: { color: "hsl(var(--primary))", icon: AlertCircle, label: "Decision" },
};

const CustomNode = ({ data }: any) => {
  const config = stepTypeConfig[data.type as keyof typeof stepTypeConfig] || stepTypeConfig.system_task;
  const Icon = config.icon;

  return (
    <Card className="min-w-[250px] p-4 shadow-lg border-2 transition-all hover:shadow-xl" style={{ borderColor: config.color }}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: config.color + "20" }}>
          <Icon className="w-5 h-5" style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="text-xs">
              {config.label}
            </Badge>
          </div>
          <h4 className="font-semibold text-sm mb-1 line-clamp-2">{data.name}</h4>
          {data.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{data.description}</p>
          )}
          {data.assignee_role && (
            <div className="mt-2 text-xs text-muted-foreground">
              Assignee: <span className="font-medium">{data.assignee_role}</span>
            </div>
          )}
          {data.linked_obligations && data.linked_obligations.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {data.linked_obligations.map((obl: string) => (
                <Badge key={obl} variant="outline" className="text-xs">
                  {obl}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};

export const VisualWorkflowTab = ({ analysis }: VisualWorkflowTabProps) => {
  const { workflow_json } = analysis;

  // Convert workflow steps to React Flow nodes
  const initialNodes: Node[] = useMemo(() => {
    return workflow_json.steps.map((step, index) => ({
      id: step.id,
      type: "customNode",
      position: { 
        x: (index % 3) * 350, 
        y: Math.floor(index / 3) * 200 
      },
      data: {
        name: step.name,
        type: step.type,
        description: step.description,
        assignee_role: step.assignee_role,
        linked_obligations: step.linked_obligations,
        input_fields: step.input_fields,
        output_fields: step.output_fields,
      },
    }));
  }, [workflow_json.steps]);

  // Convert next_step_ids and branches to React Flow edges
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    
    // Create edges from next_step_ids
    workflow_json.steps.forEach((step) => {
      if (step.next_step_ids && step.next_step_ids.length > 0) {
        step.next_step_ids.forEach((nextId) => {
          edges.push({
            id: `${step.id}-${nextId}`,
            source: step.id,
            target: nextId,
            type: "smoothstep",
            animated: true,
          });
        });
      }
    });

    // Create edges from branches with labels
    workflow_json.branches.forEach((branch, index) => {
      if (branch.from_step_id && branch.to_step_id) {
        edges.push({
          id: `branch-${index}`,
          source: branch.from_step_id,
          target: branch.to_step_id,
          type: "smoothstep",
          label: branch.condition,
          animated: true,
          style: { stroke: "hsl(var(--warning))", strokeWidth: 2 },
        });
      }
    });

    return edges;
  }, [workflow_json.steps, workflow_json.branches]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const [isAutoLayout, setIsAutoLayout] = useState(false);

  const applyAutoLayout = useCallback(() => {
    const layoutedNodes = nodes.map((node, index) => ({
      ...node,
      position: {
        x: (index % 3) * 350,
        y: Math.floor(index / 3) * 200,
      },
    }));
    setNodes(layoutedNodes);
    setIsAutoLayout(true);
    setTimeout(() => setIsAutoLayout(false), 1000);
  }, [nodes, setNodes]);

  return (
    <div className="space-y-4">
      {/* Workflow Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{workflow_json.name}</h3>
            {workflow_json.description && (
              <p className="text-muted-foreground">{workflow_json.description}</p>
            )}
          </div>
          <Button onClick={applyAutoLayout} variant="outline" size="sm">
            Auto Layout
          </Button>
        </div>

        {/* Triggers Section */}
        {workflow_json.triggers && workflow_json.triggers.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold mb-2 text-sm">Workflow Triggers</h4>
            <div className="flex flex-wrap gap-2">
              {workflow_json.triggers.map((trigger, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  <Play className="w-3 h-3" />
                  {trigger.event}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Visual Flow Builder */}
      <Card className="p-0 overflow-hidden" style={{ height: "600px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              const stepType = node.data.type as keyof typeof stepTypeConfig;
              return stepTypeConfig[stepType]?.color || "hsl(var(--muted))";
            }}
            maskColor="hsl(var(--background) / 0.8)"
          />
          <Panel position="top-right" className="bg-card p-3 rounded-lg shadow-lg border">
            <div className="space-y-2 text-xs">
              <div className="font-semibold mb-2">Legend</div>
              {Object.entries(stepTypeConfig).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: config.color }} />
                    <Icon className="w-3 h-3" style={{ color: config.color }} />
                    <span>{config.label}</span>
                  </div>
                );
              })}
            </div>
          </Panel>
        </ReactFlow>
      </Card>

      {/* Instructions */}
      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Drag nodes to reposition them. Scroll to zoom. Use the controls in the bottom-left to navigate.
          Colored badges show step types, and arrows indicate workflow progression.
        </p>
      </Card>
    </div>
  );
};
