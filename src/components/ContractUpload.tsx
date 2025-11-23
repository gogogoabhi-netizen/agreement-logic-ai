import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Sparkles, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContractUploadProps {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

export const ContractUpload = ({ onAnalyze, isAnalyzing }: ContractUploadProps) => {
  const [contractText, setContractText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const { toast } = useToast();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const MIN_TEXT_LENGTH = 100; // Minimum characters for a valid contract

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Please upload a file under 10MB.",
        variant: "destructive",
      });
      e.target.value = ""; // Reset input
      return;
    }

    setSelectedFileName(file.name);
    setIsExtracting(true);

    // Handle plain text files directly
    if (file.type === "text/plain") {
      try {
        const text = await file.text();
        const trimmedText = text.trim();

        if (!trimmedText) {
          toast({
            title: "Empty file",
            description: "The text file appears to be empty. Please check the file and try again.",
            variant: "destructive",
          });
          setIsExtracting(false);
          return;
        }

        if (trimmedText.length < MIN_TEXT_LENGTH) {
          toast({
            title: "File too short",
            description: "The text seems too short for a contract. Please verify the file contains the full agreement text.",
            variant: "destructive",
          });
        }

        setContractText(trimmedText);
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
      } finally {
        setIsExtracting(false);
      }
      return;
    }

    // Handle PDF and Word files via backend extraction
    if (
      file.type === "application/pdf" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      try {
        // Show extraction toast
        toast({
          title: "Extracting text",
          description: `Processing ${file.name}...`,
        });

        // Create form data and send to backend
        const formData = new FormData();
        formData.append('file', file);

        const { data, error } = await supabase.functions.invoke('extract-contract-text', {
          body: formData,
        });

        if (error) {
          throw error;
        }

        if (data.error) {
          toast({
            title: "Extraction failed",
            description: data.error,
            variant: "destructive",
          });
          setIsExtracting(false);
          return;
        }

        const extractedText = data.contract_text;

        if (!extractedText || extractedText.trim().length < MIN_TEXT_LENGTH) {
          toast({
            title: "Document too short",
            description: "The extracted text seems too short for a contract. Please verify the document.",
            variant: "destructive",
          });
        }

        setContractText(extractedText);
        toast({
          title: "Extraction successful",
          description: `Text extracted from ${file.name}`,
        });
      } catch (error) {
        console.error('Extraction error:', error);
        toast({
          title: "Extraction failed",
          description: "Could not extract text from this file. Please try another file or paste the text manually.",
          variant: "destructive",
        });
      } finally {
        setIsExtracting(false);
      }
      return;
    }

    // Unsupported file type
    toast({
      title: "Unsupported file type",
      description: "Please upload a .txt, .pdf, or .docx file, or paste your agreement text directly.",
      variant: "destructive",
    });
    setIsExtracting(false);
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
          <div className={`border-2 border-dashed border-border rounded-lg p-8 text-center transition-all ${
            isExtracting ? "opacity-50 pointer-events-none" : "hover:border-primary/50"
          }`}>
            <label htmlFor="file-upload" className={`${isExtracting ? "cursor-not-allowed" : "cursor-pointer"} block`}>
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-secondary rounded-full">
                  <Upload className={`w-6 h-6 text-muted-foreground ${isExtracting ? "animate-pulse" : ""}`} />
                </div>
                <div>
                  {isExtracting ? (
                    <>
                      <p className="font-medium text-foreground">
                        Extracting text from your document...
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Please wait while we process your file
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-foreground">
                        Drop your agreement file here or <span className="text-primary">browse</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Supports .txt, .pdf, and .docx files (max 10MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isAnalyzing || isExtracting}
              />
            </label>
          </div>

          {selectedFileName && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Selected:</span> {selectedFileName}
            </div>
          )}

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
              disabled={isAnalyzing || isExtracting}
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
            disabled={isAnalyzing || isExtracting || !contractText.trim()}
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
