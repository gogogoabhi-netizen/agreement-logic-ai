import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContractUpload } from "@/components/ContractUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import { SummaryMetrics } from "@/components/SummaryMetrics";
import { ExportActions } from "@/components/ExportActions";
import { FeatureTeasers } from "@/components/FeatureTeasers";
import { AgreementAnalysis } from "@/types/agreement";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileText, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { User, Session } from "@supabase/supabase-js";

const Index = () => {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AgreementAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { toast } = useToast();

  // Auth state management
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user profile when logged in
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserName("");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        // Redirect to auth page if not logged in
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setUserName(data.name);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logged out",
          description: "You've been successfully logged out.",
        });
        navigate("/auth");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
    setShowLogoutDialog(false);
  };

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

  // Don't render until auth check is complete
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">Agreement Workflow Copilot</h1>
                  {userName && (
                    <span className="text-sm text-muted-foreground font-normal">
                      · Greetings {userName}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">AI-powered contract analysis and workflow automation</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(true)}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
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

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to login again to access the application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Yes, Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
