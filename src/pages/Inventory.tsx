
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, FileText, Calendar, Star, ArrowUpRight } from "lucide-react";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const papers = [
    {
      id: 1,
      title: "Advanced Neural Networks in Modern AI Systems",
      authors: "John Doe, Jane Smith",
      date: "2024-02-15",
      stars: 156,
      category: "Machine Learning",
    },
    {
      id: 2,
      title: "Quantum Computing Applications in AI",
      authors: "Robert Johnson, Emily Brown",
      date: "2024-02-10",
      stars: 243,
      category: "Quantum Computing",
    },
    // Add more mock papers here
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-[#F1F0FB] via-white to-[#E5DEFF]">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-4 text-[#1F2937]">Research Papers</h1>
          <p className="text-[#6B7280]">Browse and manage your research paper collection</p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#E5DEFF] group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[#8B5CF6]/10 rounded-lg">
                  <FileText className="h-6 w-6 text-[#8B5CF6]" />
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2 text-[#1F2937]">{paper.title}</h3>
              <p className="text-[#6B7280] text-sm mb-4">{paper.authors}</p>
              <div className="flex items-center justify-between text-sm text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {paper.date}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  {paper.stars}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
