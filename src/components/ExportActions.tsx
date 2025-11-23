import { AgreementAnalysis } from "@/types/agreement";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportActionsProps {
  analysis: AgreementAnalysis;
}

export const ExportActions = ({ analysis }: ExportActionsProps) => {
  const { toast } = useToast();

  const downloadWorkflowJson = () => {
    const json = JSON.stringify(analysis.workflow_json, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "maestro-workflow.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Workflow exported",
      description: "Your workflow JSON has been downloaded.",
    });
  };

  const downloadObligationsCsv = () => {
    const obligations = analysis.entities.obligations;
    
    if (obligations.length === 0) {
      toast({
        title: "No obligations",
        description: "There are no obligations to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = ["ID", "Description", "Responsible", "Deadline", "Frequency", "Related SLA"];
    const rows = obligations.map((obl) => [
      obl.id,
      `"${obl.description.replace(/"/g, '""')}"`,
      obl.responsible,
      obl.deadline || "",
      obl.frequency || "",
      obl.related_sla_id || "",
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "obligations.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Obligations exported",
      description: "Your obligations CSV has been downloaded.",
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={downloadWorkflowJson}
        className="flex items-center gap-2"
      >
        <FileJson className="w-4 h-4" />
        Download Workflow JSON
      </Button>
      <Button
        variant="outline"
        onClick={downloadObligationsCsv}
        className="flex items-center gap-2"
      >
        <FileSpreadsheet className="w-4 h-4" />
        Download Obligations CSV
      </Button>
    </div>
  );
};
