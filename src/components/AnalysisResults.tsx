import { AgreementAnalysis } from "@/types/agreement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { EntitiesTab } from "./analysis/EntitiesTab";
import { WorkflowTab } from "./analysis/WorkflowTab";
import { IntegrationsTab } from "./analysis/IntegrationsTab";
import { RisksTab } from "./analysis/RisksTab";
import { Users, GitBranch, Plug, AlertTriangle } from "lucide-react";

interface AnalysisResultsProps {
  analysis: AgreementAnalysis;
}

export const AnalysisResults = ({ analysis }: AnalysisResultsProps) => {
  return (
    <Card className="p-6 bg-gradient-card shadow-lg">
      <Tabs defaultValue="entities" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="entities" className="flex items-center gap-2 py-3">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Entities</span>
          </TabsTrigger>
          <TabsTrigger value="workflow" className="flex items-center gap-2 py-3">
            <GitBranch className="w-4 h-4" />
            <span className="hidden sm:inline">Workflow</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2 py-3">
            <Plug className="w-4 h-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="risks" className="flex items-center gap-2 py-3">
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden sm:inline">Risks</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="entities" className="mt-0">
            <EntitiesTab analysis={analysis} />
          </TabsContent>

          <TabsContent value="workflow" className="mt-0">
            <WorkflowTab analysis={analysis} />
          </TabsContent>

          <TabsContent value="integrations" className="mt-0">
            <IntegrationsTab analysis={analysis} />
          </TabsContent>

          <TabsContent value="risks" className="mt-0">
            <RisksTab analysis={analysis} />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};
