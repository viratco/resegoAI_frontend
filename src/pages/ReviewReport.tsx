import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { marked } from "marked";
import { useLocation } from 'react-router-dom';

// Reuse the same interfaces from ResearchReport
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
}

// Reuse the same styles from ResearchReport
const reportStyles = `
  .research-report h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #7c3aed;
    margin-bottom: 2rem;
    letter-spacing: -0.025em;
    line-height: 1.2;
  }

  // ... rest of the styles from ResearchReport ...
  // (Copy all the CSS styles from ResearchReport)
`;

export default function ReviewReport() {
  const location = useLocation();
  const { savedReport } = location.state || {};
  const [report, setReport] = useState<Report | null>(null);
  const [showReferences, setShowReferences] = useState(false);

  useEffect(() => {
    if (savedReport) {
      setReport({
        report: savedReport.content,
        papers: savedReport.papers || []
      });
    }
  }, [savedReport]);

  if (!report) {
    return (
      <div className="container max-w-7xl mx-auto px-4 min-h-screen pt-24">
        <div className="text-center text-muted-foreground">
          No report data available
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{reportStyles}</style>
      <div className="container max-w-7xl mx-auto px-4 min-h-screen pt-24">
        {/* Header Section */}
        <div className="mb-12">
          <div className="w-full max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
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
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Report Content */}
          <div className="flex-1 max-w-4xl">
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
          </div>

          {/* Right Column - Metadata */}
          <div className="w-80">
            <div className="sticky top-24">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Report Details</h3>
                {savedReport && (
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Created: {new Date(savedReport.created_at).toLocaleDateString()}</p>
                    {savedReport.updated_at && (
                      <p>Last Updated: {new Date(savedReport.updated_at).toLocaleDateString()}</p>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 