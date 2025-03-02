import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { marked } from "marked";
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

interface Paper {
  title: string;
  authors: string[];
  abstract: string;
  link: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function ResearchSearch() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [summaries, setSummaries] = useState<string[]>([]);
  const [consolidatedSummary, setConsolidatedSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { savedSearch, isReview } = location.state || {};

  // Add state for review mode
  const [isReviewMode, setIsReviewMode] = useState(false);

  useEffect(() => {
    // If we're reviewing a saved search, set it directly
    if (isReview && savedSearch) {
      setIsReviewMode(true);
      setPapers(savedSearch.papers.map(p => p.paper));
      setSummaries(savedSearch.papers.map(p => p.analysis));
      setConsolidatedSummary(savedSearch.consolidatedSummary);
      
      // Set the search input value
      const searchInput = document.getElementById("searchInput") as HTMLInputElement;
      if (searchInput) {
        searchInput.value = savedSearch.query;
      }
    }
  }, [isReview, savedSearch]);

  const searchPapers = async () => {
    const query = (document.getElementById("searchInput") as HTMLInputElement).value.trim();
    setIsLoading(true);

    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('No valid session');
      }

      const response = await fetch(`${API_URL}/api/search-papers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch papers');
      }

      const data = await response.json();
      setPapers(data.papers);
      setSummaries(data.summaries);
      setConsolidatedSummary(data.consolidatedSummary);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to search papers",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveToInventory = async () => {
    if (!consolidatedSummary || papers.length === 0) return;

    setIsSaving(true);
    try {
      const searchQuery = (document.getElementById("searchInput") as HTMLInputElement).value.trim();
      
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        throw new Error('No valid session');
      }

      // Save to search_papers table
      const response = await supabase
        .from('search_papers')
        .insert({
          title: searchQuery,
          papers: papers.map((paper, index) => ({
            paper: {
              title: paper.title,
              authors: paper.authors,
              link: paper.link,
              abstract: paper.abstract
            },
            analysis: summaries[index]
          })),
          consolidated_summary: consolidatedSummary,
          user_id: session.user.id
        })
        .select()
        .single();

      if (response.error) {
        console.error('Supabase error:', response.error);
        throw new Error('Failed to save to inventory');
      }

      toast({
        title: "Success",
        description: "Search results saved to inventory"
      });
    } catch (error) {
      console.error('Error saving to inventory:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save to inventory",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePaperClick = (paper: Paper) => {
    navigate('/paper-details', { state: { paper } });
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 min-h-screen pt-24">
      {/* Show search input only if not in review mode */}
      {!isReviewMode && (
        <div className="flex flex-col items-center justify-center space-y-12 mb-12">
          <div className="w-full max-w-3xl space-y-2">
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="text-xl">Find papers</span>
            </div>

            {/* Search box with placeholder */}
            <div className="relative w-full">
              <Input
                id="searchInput"
                placeholder="Enter your research query"
                className="w-full text-lg h-32 px-6 pt-4 pb-20 rounded-2xl shadow-sm border-2 focus:border-primary align-top"
                onKeyPress={(e) => e.key === 'Enter' && searchPapers()}
              />
              <Button
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-primary hover:bg-primary/90"
                onClick={searchPapers}
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

            {/* Research report button */}
            <div 
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-accent cursor-pointer mt-6"
              onClick={() => navigate('/research-report')}
            >
              <div className="p-2 rounded-lg bg-muted">
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
              </div>
              <span className="text-lg font-medium">Get a research report</span>
            </div>
          </div>
        </div>
      )}

      {/* Show review header if in review mode */}
      {isReviewMode && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Saved Search Results
          </h1>
          <p className="text-gray-600 mt-2">
            Query: {savedSearch?.query}
          </p>
        </div>
      )}

      {/* Show consolidated summary */}
      {consolidatedSummary && (
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Research Overview</h2>
            {!isReviewMode && (
              <Button
                onClick={saveToInventory}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save to Inventory
              </Button>
            )}
          </div>
          <div className="bg-primary/5 rounded-lg p-6">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: marked.parse(consolidatedSummary) as string
              }} 
            />
          </div>
        </div>
      )}

      {/* Show papers grid */}
      {papers.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {papers.map((paper, index) => (
            <div
              key={index}
              onClick={() => handlePaperClick(paper)}
              className="cursor-pointer hover:bg-gray-50 transition-colors p-6 rounded-lg border"
            >
              <h3 className="text-xl font-semibold mb-2 text-primary hover:text-primary/80">
                {paper.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Authors: {paper.authors.join(', ')}
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium mb-2">Analysis:</p>
                <div 
                  className="prose prose-sm"
                  dangerouslySetInnerHTML={{ 
                    __html: marked.parse(summaries[index]) as string
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 