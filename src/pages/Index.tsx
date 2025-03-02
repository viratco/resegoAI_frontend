import { Brain, ChartLine, Database, Layers, Network, ArrowRight, Sparkles, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (!element.classList.contains("is-visible")) {
              element.classList.add("is-visible");
              const animationClass = element.dataset.animation || "fade-in";
              element.classList.add(animationClass);
            }
          } else {
            element.classList.remove("is-visible");
            const animationClass = element.dataset.animation || "fade-in";
            element.classList.remove(animationClass);
            element.classList.add("fade-out");
            setTimeout(() => {
              element.classList.remove("fade-out");
            }, 700);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "-100px 0px"
      }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F1F0FB] via-white to-[#E5DEFF] -z-10" />
        <div className="absolute inset-0 opacity-10 -z-10 bg-grid-pattern" />
        <div className="container max-w-6xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0" data-animation="fade-in-blur">
            <span className="px-4 py-2 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] font-medium text-sm mb-6 inline-block floating">
              <Sparkles className="w-4 h-4 inline-block mr-2" />
              Advancing AI Research
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-balance bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
              Discover the Future of{" "}
              <span className="text-[#8B5CF6]">AI Research</span>
            </h1>
            <p className="text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto mb-8">
              Explore cutting-edge AI research papers, collaborate with experts, and
              stay ahead in the rapidly evolving field of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/research">
                  <Button size="lg">
                    Start Researching
                  </Button>
                </Link>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Sign in to access research features
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link to="/signin">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link to="/signup">
                      <Button>Sign Up</Button>
                    </Link>
                  </div>
                </div>
              )}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                  className="bg-[#8B5CF6] text-white px-6 py-2 rounded-lg hover:bg-[#7C3AED] transition-colors"
                >
                  How it Works
                </button>
                {/* ... other buttons ... */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - seamless connection with the hero section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F1F0FB] via-[#F5F3FF] to-[#E5DEFF]">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0" data-animation="fade-in-up">
            <span className="px-4 py-2 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] font-medium text-sm mb-6 inline-block">
              <Sparkles className="w-4 h-4 inline-block mr-2" />
              Key Features
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
              Powerful AI Research Tools
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly design to enhance your research experience.
            </p>
          </div>
          
          {/* First Feature Block - Image Left, Text Right */}
          <div className="mb-24 animate-on-scroll opacity-0" data-animation="fade-in-up">
            <div className="max-w-6xl w-full rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Left row - Image */}
                <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
                  <div className="w-full h-full max-h-[700px] overflow-hidden rounded-lg">
                    <img 
                      src="report.jpg" 
                      alt="AI-powered research" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Right row - Text content */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                  <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6 self-start">
                    
                    RESEARCH REPORT
                  </div>
                  
                  <h3 className="text-3xl font-bold text-purple-800 mb-6">
                    Analyze more evidence, more accurately
                  </h3>
                  
                  <p className="text-purple-700 text-lg mb-6">
                    Systematic reviews are the gold standard of evidence synthesis, but take too long.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="border-l-4 border-purple-300 pl-4">
                      <h4 className="text-xl font-semibold text-purple-800 mb-2">
                      50% Faster Processing 
                      </h4>
                      <p className="text-purple-600">
                      Analyze more studies in less time, gaining deeper insights into individual papers.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-purple-300 pl-4">
                      <h4 className="text-xl font-semibold text-purple-800 mb-2">
                      Effortless Data Extraction
                      </h4>
                      <p className="text-purple-600">
                      Extract key information from hundreds of papers, including data hidden in tables, within minutes.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-purple-300 pl-4">
                      <h4 className="text-xl font-semibold text-purple-800 mb-2">
                      AI-Powered Screening
                      </h4>
                      <p className="text-purple-600">
                      identify relevant research with automated yet fully transparent selection processes.

                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second Feature Block - Text Left, Image Right */}
          <div className="animate-on-scroll opacity-0" data-animation="fade-in-up">
            <div className="max-w-6xl w-full rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row-reverse">
                {/* Right row - Image */}
                <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
                  <div className="w-full h-full max-h-[900px] overflow-hidden rounded-lg">
                    <img 
                      src="paper.jpg" 
                      alt="AI collaboration" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Left row - Text content */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                  <div className="inline-flex items-center bg-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 self-start">
                    <Network size={16} className="mr-2" />
                    AI-POWERED RESEARCH PAPER SEARCH
                  </div>
                  
                  <h3 className="text-3xl font-bold text-purple-800 mb-6">
                  Find relevant research papers instantly with AI-generated summaries.                  </h3>
                  
                  <p className="text-purple-700 text-lg mb-6">
                  Access a vast database of academic papers across multiple disciplines to stay updated on the latest research with -
                  </p>
                  
                  <div className="space-y-6">
                    <div className="border-l-4 border-purple-300 pl-4">
                      <h4 className="text-xl font-semibold text-purple-800 mb-2">
                       Smart Paper Discovery
                      </h4>
                      <p className="text-purple-600">
                      Simply enter a topic, and our AI will fetch the most relevant research papers from trusted sources.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-purple-300 pl-4">
                      <h4 className="text-xl font-semibold text-purple-800 mb-2">
                       AI-Generated Summaries
                      </h4>
                      <p className="text-purple-600">
                      Save time with concise, AI-powered summaries that highlight key findings and insights from each paper.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-purple-300 pl-4">
                      <h4 className="text-xl font-semibold text-purple-800 mb-2">
                       Effortless Exploration                      </h4>
                      <p className="text-purple-600">
                      Navigate complex topics easily with AI-driven recommendations and keyword-based filtering.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (replacing Stats Section) */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F1F0FB] via-[#F5F3FF] to-[#E5DEFF]">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0" data-animation="fade-in-up">
            <span className="px-4 py-2 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] font-medium text-sm mb-6 inline-block">
              <Users className="w-4 h-4 inline-block mr-2" />
              Testimonials
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
              What Our Users Say
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              Discover how our platform has transformed research workflows for professionals around the world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="animate-on-scroll opacity-0 bg-white/50 p-8 rounded-xl shadow-sm" data-animation="fade-in-up" style={{ animationDelay: "0ms" }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[#1F2937]">priyanshu kumar</h4>
                  <p className="text-[#6B7280] text-sm">University of Delhi</p>
                </div>
              </div>
              <p className="text-[#4B5563] italic mb-4">
              “This website has been a game-changer for my school assignments. The AI-powered search helped me find the most relevant research papers in seconds, and the summaries made understanding complex topics effortless. It's like having a personal research assistant!”              </p>
              <div className="flex text-[#8B5CF6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="animate-on-scroll opacity-0 bg-white/50 p-8 rounded-xl shadow-sm" data-animation="fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[#1F2937]">Aisha Patel</h4>
                  <p className="text-[#6B7280] text-sm">Graduate Student in Biotechnology
                  </p>
                </div>
              </div>
              <p className="text-[#4B5563] italic mb-4">
              “I used to spend hours digging through research papers, but now, I get AI-curated papers with key insights in seconds. This platform has made my academic work so much more efficient!”              </p>
              <div className="flex text-[#8B5CF6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="animate-on-scroll opacity-0 bg-white/50 p-8 rounded-xl shadow-sm" data-animation="fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[#1F2937]">Dr. Maya Patel</h4>
                  <p className="text-[#6B7280] text-sm">PhD Candidate in Computer Science</p>
                </div>
              </div>
              <p className="text-[#4B5563] italic mb-4">
              “This platform has completely transformed the way I research. The AI-powered summaries give me instant clarity on new papers, saving me time and effort. I highly recommend it to anyone in academia!”              </p>
              <div className="flex text-[#8B5CF6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-[#F1F0FB] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#8B5CF6]/5" />
        <div className="container max-w-6xl mx-auto relative">
          <div className="text-center mb-16 animate-on-scroll opacity-0" data-animation="fade-in-up">
            <span className="px-4 py-2 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] font-medium text-sm mb-6 inline-block">
              <Sparkles className="w-4 h-4 inline-block mr-2" />
              How It Works
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
              Simple and Effective
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              Our platform makes it easy to discover, analyze, and contribute to AI research.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Arrow UI */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-[#8B5CF6]/5 rounded-3xl" />
              <div className="relative p-8 min-h-[600px] flex flex-col items-center justify-between">
                {/* Step 1 to 2 */}
                <div className="w-full flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-xl font-bold">1</div>
                  <div className="h-20 w-px bg-gradient-to-b from-[#8B5CF6] to-[#D946EF]" />
                  <div className="w-16 h-16 rounded-full bg-[#9B87F5] text-white flex items-center justify-center text-xl font-bold">2</div>
                </div>

                {/* Connecting Line */}
                <div className="w-px h-20 bg-gradient-to-b from-[#9B87F5] to-[#8B5CF6] my-4" />

                {/* Step 3 to 4 */}
                <div className="w-full flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-xl font-bold">3</div>
                  <div className="h-20 w-px bg-gradient-to-b from-[#8B5CF6] to-[#D946EF]" />
                  <div className="w-16 h-16 rounded-full bg-[#9B87F5] text-white flex items-center justify-center text-xl font-bold">4</div>
                </div>

                {/* Static Arrows */}
                <div className="absolute left-1/2 top-[28%] -translate-x-1/2 opacity-70">
                  <ArrowRight className="w-6 h-6 text-[#8B5CF6] transform rotate-90" />
                </div>
                <div className="absolute left-1/2 top-[72%] -translate-x-1/2 opacity-70">
                  <ArrowRight className="w-6 h-6 text-[#8B5CF6] transform rotate-90" />
                </div>
              </div>
            </div>

            {/* Right Column - Step Descriptions */}
            <div className="space-y-8">
              {steps.slice(0, 4).map((step, index) => (
                <div
                  key={step.title}
                  className="animate-on-scroll opacity-0 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-[#E5DEFF] shadow-lg"
                  data-animation="fade-in-blur"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-[#8B5CF6]">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold mb-2 text-[#1F2937]">
                        {step.title}
                      </h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white relative">
        <div className="container max-w-6xl mx-auto">
          <div className="animate-on-scroll opacity-0" data-animation="fade-in-blur">
            <h2 className="text-center font-heading text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
              Connect With Us
            </h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/resegoai_/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/resego-ai-046154354/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-[#8B5CF6] text-white shadow-lg transition-all duration-300 hover:bg-[#7C3AED] ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <ArrowRight className="w-5 h-5 -rotate-90" />
      </button>
    </div>
  );
};

const features = [
  {
    icon: Brain,
    title: "Smart Search",
    description:
      "Advanced AI-powered search to find relevant research papers instantly.",
  },
  {
    icon: Network,
    title: "Collaboration",
    description:
      "Connect with fellow researchers and collaborate on groundbreaking projects.",
  },
  {
    icon: Database,
    title: "Large Database",
    description:
      "Access thousands of peer-reviewed AI research papers from top institutions.",
  },
  {
    icon: ChartLine,
    title: "Analytics",
    description:
      "Track research trends and gain insights with powerful analytics tools.",
  },
  {
    icon: Layers,
    title: "Organization",
    description:
      "Keep your research organized with smart collections and tagging.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Join a thriving community of AI researchers and share knowledge.",
  },
];

const stats = [
  {
    value: "50K+",
    label: "Research Papers",
  },
  {
    value: "100K+",
    label: "Researchers",
  },
  {
    value: "200+",
    label: "Institutions",
  },
  {
    value: "95%",
    label: "Satisfaction Rate",
  },
];

const steps = [
  {
    title: "Create an Account",
    description: "Sign up for free and set up your research profile with your interests and expertise.",
  },
  {
    title: "Explore Research",
    description: "Browse through our extensive database of AI research papers and find relevant content.",
  },
  {
    title: "Save and Organize",
    description: "Save papers to your inventory and organize them with tags and collections.",
  },
  {
    title: "Stay Updated",
    description: "Get notifications about new papers in your field and track research trends.",
  },
  {
    title: "Collaborate",
    description: "Connect with other researchers and collaborate on projects and papers.",
  },
  {
    title: "Share Insights",
    description: "Share your findings and contribute to the AI research community.",
  },
];

export default Index;
