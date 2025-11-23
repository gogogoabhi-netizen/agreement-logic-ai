import { useState } from "react";
import { ContractUpload } from "@/components/ContractUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import { AgreementAnalysis } from "@/types/agreement";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

const Index = () => {
  const [analysis, setAnalysis] = useState<AgreementAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (contractText: string) => {
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-agreement', {
        body: { contractText }
      });

      if (error) {
        console.error('Error invoking function:', error);
        throw new Error(error.message || 'Failed to analyze agreement');
      }

      if (!data || !data.analysis) {
        throw new Error('No analysis data received');
      }

      setAnalysis(data.analysis);
      toast({
        title: "Analysis complete!",
        description: "Your agreement has been analyzed and the workflow has been generated.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to analyze the agreement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Agreement Workflow Copilot</h1>
              <p className="text-sm text-muted-foreground">AI-powered contract analysis and workflow automation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <ContractUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          
          {analysis && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AnalysisResults analysis={analysis} />
            </div>
          )}

          {!analysis && !isAnalyzing && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Upload or paste an agreement to get started</p>
              <p className="text-sm mt-2">The AI will automatically extract entities, design workflows, and identify risks</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
