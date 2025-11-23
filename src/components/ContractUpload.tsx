import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContractUploadProps {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

export const ContractUpload = ({ onAnalyze, isAnalyzing }: ContractUploadProps) => {
  const [contractText, setContractText] = useState("");
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      toast({
        title: "Unsupported file type",
        description: "Please upload a .txt file or paste your agreement text directly.",
        variant: "destructive",
      });
      return;
    }

    try {
      const text = await file.text();
      setContractText(text);
      toast({
        title: "File uploaded",
        description: "Your agreement text has been loaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error reading file",
        description: "There was a problem reading your file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAnalyze = () => {
    if (!contractText.trim()) {
      toast({
        title: "No content",
        description: "Please upload a file or paste your agreement text first.",
        variant: "destructive",
      });
      return;
    }
    onAnalyze(contractText);
  };

  return (
    <Card className="p-8 bg-gradient-card shadow-lg">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Agreement Analysis</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Upload your agreement or paste the text below to automatically generate a structured workflow
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                <Upload className="w-5 h-5" />
                <span className="font-medium">Upload Text File</span>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isAnalyzing}
              />
            </label>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or paste text</span>
            </div>
          </div>

          <Textarea
            placeholder="Paste your agreement or contract text here..."
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            className="min-h-[200px] resize-none font-mono text-sm"
            disabled={isAnalyzing}
          />

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !contractText.trim()}
            className="w-full h-12 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                Analyzing Agreement...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Workflow
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
