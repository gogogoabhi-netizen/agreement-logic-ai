import { useState } from "react";
import { ContractUpload } from "@/components/ContractUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import { SummaryMetrics } from "@/components/SummaryMetrics";
import { ExportActions } from "@/components/ExportActions";
import { FeatureTeasers } from "@/components/FeatureTeasers";
import { AgreementAnalysis } from "@/types/agreement";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          {!analysis ? (
            <>
              <ContractUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
              
              {!isAnalyzing && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-bold mb-2">How It Works</h2>
                    <p className="text-muted-foreground">
                      Our AI-powered analysis transforms contracts into structured, actionable workflows
                    </p>
                  </div>
                  <FeatureTeasers />
                </div>
              )}
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              {/* Back Button */}
              <Button
                variant="outline"
                onClick={() => setAnalysis(null)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Analyze Another Agreement
              </Button>

              {/* Summary Metrics */}
              <SummaryMetrics analysis={analysis} />

              {/* Export Actions */}
              <div className="flex justify-end">
                <ExportActions analysis={analysis} />
              </div>

              {/* Analysis Results */}
              <AnalysisResults analysis={analysis} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
