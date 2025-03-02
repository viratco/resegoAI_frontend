import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Calendar, Trash2, BookOpen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { marked } from "marked";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Report {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface SearchPaper {
  id: string;
  title: string;
  papers: any[];
  consolidated_summary: string;
  created_at: string;
}

const retryOperation = async <T,>(operation: () => Promise<T> | T): Promise<T> => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw new Error('Operation failed');
};

export default function Inventory() {
  const [reports, setReports] = useState<Report[]>([]);
  const [searchPapers, setSearchPapers] = useState<SearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'reports', 'searches'
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
    fetchSearchPapers();
  }, []);

  const fetchReports = async () => {
    try {
      const { data: { session } } = await retryOperation(() => supabase.auth.getSession());
      
      if (!session?.user?.id) {
        throw new Error('No valid session');
      }

      const { data, error } = await retryOperation(() => 
        supabase
          .from('reports')
          .select('id, title, content, created_at')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(20)
          .throwOnError()
      );

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Connection Error",
        description: "Failed to load reports. Please check your internet connection.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchPapers = async () => {
    try {
      const { data: { session } } = await retryOperation(() => supabase.auth.getSession());
      
      if (!session?.user?.id) {
        throw new Error('No valid session');
      }

      const { data, error } = await retryOperation(() => 
        supabase
          .from('search_papers')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .throwOnError()
      );

      if (error) throw error;
      setSearchPapers(data || []);
    } catch (error) {
      console.error('Error fetching search papers:', error);
      toast({
        title: "Connection Error",
        description: "Failed to load searches. Please check your internet connection.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string, type: 'report' | 'search') => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        throw new Error('No valid session');
      }

      const table = type === 'report' ? 'reports' : 'search_papers';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id);

      if (error) throw error;

      if (type === 'report') {
        setReports(reports.filter(report => report.id !== id));
      } else {
        setSearchPapers(searchPapers.filter(paper => paper.id !== id));
      }

      toast({
        title: "Success",
        description: `${type === 'report' ? 'Report' : 'Search'} deleted successfully`
      });
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete",
        variant: "destructive"
      });
    }
  };

  const handleItemClick = (item: Report | SearchPaper, type: 'report' | 'search') => {
    if (type === 'search') {
      const searchItem = item as SearchPaper;
      navigate('/research', { 
        state: { 
          savedSearch: {
            query: item.title,
            papers: searchItem.papers,
            consolidatedSummary: searchItem.consolidated_summary
          },
          isReview: true
        }
      });
    } else {
      navigate('/research-report', { 
        state: { 
          savedReport: item,
          isReview: true
        }
      });
    }
  };

  const filteredItems = () => {
    if (activeTab === 'reports') {
      return reports.filter(report => 
        report.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (activeTab === 'searches') {
      return searchPapers.filter(paper => 
        paper.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      // All items
      const filteredReports = reports.filter(report => 
        report.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredSearches = searchPapers.filter(paper => 
        paper.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return [...filteredReports, ...filteredSearches];
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-[#F1F0FB] via-white to-[#E5DEFF]">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-4 text-[#1F2937]">Research Collection</h1>
          <p className="text-[#6B7280]">Browse and manage your research papers and reports</p>
        </div>

        {/* Tabs and Search Section */}
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-8">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="searches">Searches</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems().map((item) => {
            const isSearch = 'consolidated_summary' in item;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#E5DEFF] group cursor-pointer"
                onClick={() => handleItemClick(item, isSearch ? 'search' : 'report')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-[#8B5CF6]/10 rounded-lg">
                    {isSearch ? (
                      <Search className="h-6 w-6 text-[#8B5CF6]" />
                    ) : (
                      <FileText className="h-6 w-6 text-[#8B5CF6]" />
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id, isSearch ? 'search' : 'report');
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {isSearch ? 'Search Results' : 'Research Report'}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#1F2937]">{item.title}</h3>
                  <div className="prose prose-sm max-h-24 overflow-hidden text-gray-600">
                    {isSearch ? (
                      <p>Found {item.papers?.length || 0} papers with analysis</p>
                    ) : (
                      <div dangerouslySetInnerHTML={{ 
                        __html: marked.parse(item.content.substring(0, 150) + '...') as string
                      }} />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-[#6B7280] mt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{isSearch ? (item.papers?.length || 0) : 8}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems().length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-8">
            No items found. Generate some research reports or save search results to see them here.
          </div>
        )}
      </div>
    </div>
  );
}
