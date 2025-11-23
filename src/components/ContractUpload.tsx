import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Sparkles, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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

    // Handle Word files - show coming soon message
    if (file.type === "application/msword" || 
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      toast({
        title: "Word support coming soon",
        description: "Word document support is coming soon. Please paste the contract text or use a PDF for now.",
      });
      return;
    }

    // Handle PDF files
    if (file.type === "application/pdf") {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";

        // Extract text from each page
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(" ");
          fullText += pageText + "\n";
        }

        setContractText(fullText.trim());
        toast({
          title: "PDF extracted successfully",
          description: `Extracted text from ${pdf.numPages} page${pdf.numPages > 1 ? 's' : ''}.`,
        });
      } catch (error) {
        toast({
          title: "Error reading PDF",
          description: "There was a problem extracting text from your PDF. Please try again or paste the text manually.",
          variant: "destructive",
        });
      }
      return;
    }

    // Handle text files
    if (file.type !== "text/plain") {
      toast({
        title: "Unsupported file type",
        description: "Please upload a .txt or .pdf file, or paste your agreement text directly.",
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
          {/* Drag and Drop Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <label htmlFor="file-upload" className="cursor-pointer block">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-secondary rounded-full">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Drop your agreement file here or <span className="text-primary">browse</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Supports .txt and .pdf files (Word coming soon)
                  </p>
                </div>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".txt,.pdf,.doc,.docx"
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

          <div>
            <label className="text-sm font-medium mb-2 block">Contract Text</label>
            <Textarea
              placeholder="Paste your agreement or contract text here...&#10;&#10;Example: This Software Services Agreement (&quot;Agreement&quot;) is entered into as of January 1, 2025, between Acme Corp (&quot;Provider&quot;) and TechStart Inc (&quot;Client&quot;)..."
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              className="min-h-[200px] resize-none font-mono text-sm"
              disabled={isAnalyzing}
            />
            {!contractText && (
              <div className="mt-3 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
                <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Upload an agreement file or paste the contract text to begin analysis. 
                  Our AI will extract entities, generate workflows, and identify integration opportunities.
                </p>
              </div>
            )}
          </div>

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
