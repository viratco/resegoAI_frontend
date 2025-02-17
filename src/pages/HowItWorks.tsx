
import { ArrowRight, FileSearch, Filter, FileText, FileOutput } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileSearch,
      title: "Gather Papers",
      description: "Find relevant studies from multiple databases and sources",
    },
    {
      icon: Filter,
      title: "Screen Papers",
      description: "Filter studies based on inclusion criteria",
    },
    {
      icon: FileText,
      title: "Extract Data",
      description: "Capture key metrics and findings from up to 10 papers",
    },
    {
      icon: FileOutput,
      title: "Generate Report",
      description: "Summarize insights into a cohesive document",
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-[#F1F0FB] via-white to-[#E5DEFF]">
      <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
      <div className="container max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
            How It Works
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process helps you efficiently analyze and synthesize research papers
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Background line */}
          <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8B5CF6] to-[#D946EF]/30" />
          
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex items-start gap-8 mb-16">
                <div 
                  className="animate-on-scroll opacity-0 shrink-0 relative z-10" 
                  data-animation="fade-in-left"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center border border-[#E5DEFF] transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
                    <step.icon className="w-10 h-10 text-[#8B5CF6]" />
                  </div>
                </div>
                <div 
                  className="flex-1 animate-on-scroll opacity-0" 
                  data-animation="fade-in-right"
                  style={{ animationDelay: `${index * 150 + 100}ms` }}
                >
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-[#E5DEFF] transform transition-all duration-300 hover:shadow-xl hover:translate-x-1 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] font-semibold">
                        {index + 1}
                      </span>
                      <h3 className="font-heading text-xl font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-11">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-10 ml-[-4px] h-16 flex items-center justify-center z-10">
                  <ArrowRight className="absolute text-[#8B5CF6] animate-bounce-slow w-6 h-6 transform rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
