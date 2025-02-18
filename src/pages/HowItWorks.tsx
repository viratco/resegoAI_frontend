
import { ArrowRight, FileSearch, Filter, FileText, FileOutput, BookOpen, Brain, FileCheck, CloudCog } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Literature Review",
      description: "Efficiently analyze multiple research papers and extract key findings",
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI algorithms help identify patterns and insights across papers",
    },
    {
      icon: FileCheck,
      title: "Quality Assurance",
      description: "Rigorous validation ensures accurate and reliable results",
    },
    {
      icon: CloudCog,
      title: "Cloud Processing",
      description: "Process large volumes of papers efficiently with cloud computing",
    },
  ];

  const steps = [
    {
      icon: FileSearch,
      title: "Upload Papers",
      description: "Simply upload your research papers in PDF format to get started",
    },
    {
      icon: Filter,
      title: "Select Focus Areas",
      description: "Choose specific areas or topics you want to analyze",
    },
    {
      icon: FileText,
      title: "Review Analysis",
      description: "Get comprehensive insights and patterns from your papers",
    },
    {
      icon: FileOutput,
      title: "Export Results",
      description: "Download your analysis in various formats (PDF, Word, Excel)",
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-[#F1F0FB] via-white to-[#E5DEFF]">
      <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
      
      {/* Hero Section */}
      <div className="container max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
            How It Works
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform simplifies research paper analysis, helping you extract valuable insights efficiently
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="animate-on-scroll opacity-0"
              data-animation="fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#E5DEFF] h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <feature.icon className="w-12 h-12 text-[#8B5CF6] mb-4" />
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Steps Section */}
        <div className="max-w-4xl mx-auto relative">
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

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Button size="lg" className="animate-on-scroll opacity-0" data-animation="fade-in-up">
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
