import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { marked } from "marked";

interface PaperData {
  title: string;
  authors: string[];
  abstract: string;
  summary: string;
  link: string;
}

export default function PaperDetail() {
  const [paper, setPaper] = useState<PaperData | null>(null);

  useEffect(() => {
    const paperData = localStorage.getItem('selectedPaper');
    if (paperData) {
      setPaper(JSON.parse(paperData));
    }
  }, []);

  if (!paper) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-24">
        <Card className="p-6">
          <p>No paper data found. Please return to search.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-24">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-4">{paper.title}</h1>
        <p className="text-muted-foreground mb-8">
          Authors: {paper.authors.join(', ')}
        </p>

        <div className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Abstract</h2>
          <p className="leading-relaxed">{paper.abstract}</p>
        </div>

        <div className="bg-primary/5 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">AI Summary</h2>
          <div 
            className="prose prose-slate"
            dangerouslySetInnerHTML={{ __html: marked.parse(paper.summary) as string }}
          />
        </div>

        <div className="flex justify-center">
          <Button 
            size="lg"
            onClick={() => window.open(paper.link, '_blank')}
          >
            View Official Paper
          </Button>
        </div>
      </Card>
    </div>
  );
} 