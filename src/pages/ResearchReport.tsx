import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { marked } from "marked";
import { StatusIndicator } from "@/components/StatusIndicator";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from "@/components/ui/use-toast";
import { useLocation } from 'react-router-dom';

interface PaperAnalysis {
  paper: {
    title: string;
    authors: string[];
    link: string;
  };
  analysis: string;
}

interface Report {
  report: string;
  papers: PaperAnalysis[];
  savedReport?: any;
}

interface StatusStep {
  label: string;
  status: 'completed' | 'in-progress' | 'pending';
  detail: string;
}

// Add this CSS to your globals.css or create a new style block
const reportStyles = `
  .research-report h1 {
    font-size: 2.5rem !important;
    font-weight: 800 !important;
    color: #7c3aed !important;
    margin-bottom: 2rem !important;
    letter-spacing: -0.025em !important;
    line-height: 1.2 !important;
    padding-left: 2rem !important;
  }

  .research-report h1 + p {
    font-size: 1.25rem;
    color: #4b5563;
    margin-bottom: 2rem;
    line-height: 1.75;
  }

  .research-report h2 {
    font-size: 1.25rem;
    font-weight: 500;
    color: #7c3aed;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .research-report h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #7c3aed;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .research-report p {
    font-size: 1rem;
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .research-report ul, .research-report ol {
    color: #6b7280;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  .research-report li {
    margin-bottom: 0.5rem;
  }

  .research-report table {
    width: 100%;
    margin: 1.5rem 0;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  .research-report th {
    background-color: #f3f4f6;
    color: #7c3aed;
    font-weight: 600;
    text-align: left;
    padding: 0.75rem;
    border-bottom: 2px solid #e5e7eb;
  }

  .research-report td {
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    color: #6b7280;
  }

  .research-report tr:hover {
    background-color: #f9fafb;
  }

  .paper-card {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 1rem;
  }

  .paper-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #7c3aed;
    margin-bottom: 0.5rem;
  }

  .paper-authors {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 1rem;
  }

  .paper-content {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

export default function ResearchReport() {
  const location = useLocation();
  const { savedReport, isReview } = location.state || {};
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [paperCount, setPaperCount] = useState<number>(0);
  const [showReferences, setShowReferences] = useState(false);

  const steps: StatusStep[] = [
    {
      label: "Fetch Papers",
      status: currentStep >= 1 ? 'completed' : currentStep === 0 && isLoading ? 'in-progress' : 'pending',
      detail: currentStep >= 1 ? `${paperCount} papers found` : "Searching for relevant papers"
    },
    {
      label: "AI Analysis",
      status: currentStep >= 2 ? 'completed' : currentStep === 1 ? 'in-progress' : 'pending',
      detail: currentStep >= 2 ? "Analysis complete" : "Analyzing paper contents"
    },
    {
      label: "Generate Report",
      status: currentStep >= 3 ? 'completed' : currentStep === 2 ? 'in-progress' : 'pending',
      detail: currentStep >= 3 ? "Report ready" : "Summarizing findings"
    }
  ];

  useEffect(() => {
    // If we're reviewing a saved report, set it directly
    if (isReview && savedReport) {
      setReport({
        report: savedReport.content,
        papers: savedReport.papers || [],
        savedReport: savedReport
      });
      // Set status to completed when reviewing
      setCurrentStep(3);
      setPaperCount(savedReport.papers?.length || 0);
    }
  }, [isReview, savedReport]);

  const generateReport = async () => {
    const query = (document.getElementById("reportInput") as HTMLInputElement).value.trim();
    if (!query) return;

    setIsLoading(true);
    setCurrentStep(0);

    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('No valid session');
      }

      // Simulate steps with delays
      setCurrentStep(1);
      setPaperCount(8);
      await new Promise(r => setTimeout(r, 1000));
      
      setCurrentStep(2);
      await new Promise(r => setTimeout(r, 2000));
      
      const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
      if (!baseUrl) {
        throw new Error('API URL is not configured');
      }

      const url = new URL('/api/generate-report', baseUrl);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'Origin': window.location.origin
        },
        credentials: 'include',
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate report');
      }

      const data = await response.json();

      if (!data.report || !data.papers) {
        throw new Error('Invalid report data received');
      }

      if (data.savedReport) {
        toast({
          title: "Success",
          description: "Report saved to inventory"
        });
      }

      setReport(data);
      setCurrentStep(3);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate report",
        variant: "destructive"
      });
      // Reset the state when there's an error
      setCurrentStep(0);
      setPaperCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{reportStyles}</style>
      <div className="container max-w-7xl mx-auto px-4 min-h-screen pt-24">
        {/* Only show search section if NOT reviewing */}
        {!isReview && (
          <div className="mb-12">
            <div className="w-full max-w-3xl mx-auto space-y-2">
              {/* Search label */}
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
                <span className="text-xl">Research Report</span>
              </div>

              {/* Search box with placeholder */}
              <div className="relative w-full">
                <Input
                  id="reportInput"
                  placeholder="Enter your research topic"
                  className="w-full text-lg h-32 px-6 pt-4 pb-20 rounded-2xl shadow-sm border-2 focus:border-primary align-top"
                  onKeyPress={(e) => e.key === 'Enter' && generateReport()}
                />
                <Button
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-primary hover:bg-primary/90"
                  onClick={generateReport}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  )}
                </Button>
              </div>

              {/* Additional info text */}
              <div className="text-muted-foreground text-sm mt-4 text-center">
                Generate a comprehensive research report based on available papers
              </div>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="flex gap-8">
          {/* Left Column - Report Content */}
          <div className="flex-1 max-w-4xl">
            {report && report.report && (
              <div className="space-y-8">
                <Card className="p-8">
                  <div 
                    className="research-report prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: (marked.parse(report.report, { async: false }) || '') as unknown as TrustedHTML
                    }}
                  />

                  {/* Preview References Button */}
                  <div className="mt-8 pt-6 border-t">
                    <Button
                      onClick={() => setShowReferences(!showReferences)}
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 py-6 text-base"
                    >
                      {showReferences ? (
                        <>
                          Hide Referenced Papers
                          <ChevronUp className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Preview Referenced Papers
                          <ChevronDown className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                {/* Referenced Papers Section */}
                {showReferences && report.papers && (
                  <div className="space-y-4 animate-in slide-in-from-top duration-300">
                    <h2 className="text-2xl font-semibold text-primary">Referenced Papers</h2>
                    {report.papers.map((item, index) => (
                      <Card key={index} className="paper-card">
                        <h3 className="paper-title">
                          {item.paper.title}
                        </h3>
                        <p className="paper-authors">
                          {item.paper.authors.join(', ')}
                        </p>
                        <div 
                          className="paper-content prose prose-sm"
                          dangerouslySetInnerHTML={{ 
                            __html: (marked.parse(item.analysis || '', { async: false }) || '') as unknown as TrustedHTML
                          }}
                        />
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Status */}
          <div className="w-80">
            {(isLoading || report) && (
              <div className="sticky top-24">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    Status
                    <button className="ml-auto hover:bg-accent p-1 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                      </svg>
                    </button>
                  </h3>
                  
                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <div key={index} className="relative">
                        {index !== steps.length - 1 && (
                          <div 
                            className={`absolute left-[15px] top-[30px] w-[2px] h-[calc(100%+12px)] 
                              ${step.status === 'completed' ? 'bg-primary' : 'bg-muted'}`}
                          />
                        )}
                        
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            {step.status === 'completed' && (
                              <CheckCircle2 className="w-8 h-8 text-primary" />
                            )}
                            {step.status === 'in-progress' && (
                              <Circle className="w-8 h-8 text-primary animate-pulse" />
                            )}
                            {step.status === 'pending' && (
                              <Circle className="w-8 h-8 text-muted" />
                            )}
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-base">{step.label}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {step.status === 'in-progress' ? (
                                <span className="flex items-center gap-2">
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  {step.detail}
                                </span>
                              ) : (
                                step.detail
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 