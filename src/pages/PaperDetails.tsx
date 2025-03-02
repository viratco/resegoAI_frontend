import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

interface Paper {
  title: string;
  authors: string[];
  abstract: string;
  link: string;
}

interface LocationState {
  paper: Paper;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function PaperDetails() {
  const location = useLocation();
  const { paper } = location.state as LocationState;
  const [aiSummary, setAiSummary] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateSummary = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.access_token) {
          throw new Error('No valid session');
        }

        const response = await fetch(`${API_URL}/api/analyze-paper`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({ abstract: paper.abstract }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to generate summary');
        }

        const data = await response.json();
        setAiSummary(data.summary);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to generate summary",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    generateSummary();
  }, [paper]);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-24">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">{paper.title}</h1>
        
        <div className="flex flex-wrap gap-2">
          {paper.authors.map((author, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {author}
            </span>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Abstract</h2>
          <p className="text-gray-700 leading-relaxed">{paper.abstract}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">AI Reference</h2>
          {loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating reference...
            </div>
          ) : (
            <div className="bg-primary/5 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">{aiSummary}</p>
            </div>
          )}
        </div>

        <a 
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Read Full Paper
        </a>
      </div>
    </div>
  );
} 