
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
      <div className="container max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
            How It Works
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process helps you efficiently analyze and synthesize research papers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex items-center gap-8 mb-12">
                <div className="animate-on-scroll opacity-0" data-animation="fade-in-left">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-[#E5DEFF]">
                    <step.icon className="w-10 h-10 text-[#8B5CF6]" />
                  </div>
                </div>
                <div className="flex-1 animate-on-scroll opacity-0" data-animation="fade-in-right">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-[#E5DEFF]">
                    <h3 className="font-heading text-xl font-semibold mb-2 text-gray-900">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-10 ml-[-4px] h-12 flex items-center justify-center">
                  <div className="h-full w-0.5 bg-[#E5DEFF]" />
                  <ArrowRight className="absolute bottom-0 text-[#8B5CF6] animate-bounce" />
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
