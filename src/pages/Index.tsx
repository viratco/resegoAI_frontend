import { Brain, ChartLine, Database, Layers, Network, ArrowRight, Sparkles, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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
              <button className="group px-8 py-3 rounded-lg bg-[#8B5CF6] text-white font-medium hover:bg-[#7C3AED] transition-all duration-300 flex items-center justify-center gap-2">
                Start Exploring
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link 
                to="/how-it-works" 
                className="px-8 py-3 rounded-lg border border-[#8B5CF6]/20 text-[#8B5CF6] hover:bg-[#8B5CF6]/5 transition-all duration-300"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-[#F1F0FB] opacity-70" />
        <div className="container max-w-6xl mx-auto relative">
          <div className="text-center mb-16 animate-on-scroll opacity-0" data-animation="fade-in-up">
            <span className="px-4 py-2 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] font-medium text-sm mb-6 inline-block">
              <Sparkles className="w-4 h-4 inline-block mr-2" />
              Features
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
              Everything You Need
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              Access powerful tools and features designed specifically for AI
              researchers and enthusiasts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-on-scroll opacity-0 bg-gradient-to-br from-white to-[#F1F0FB] p-6 rounded-xl border border-[#E5DEFF] shadow-lg"
                data-animation="fade-in-blur"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-[#8B5CF6]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-[#8B5CF6]" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-[#1F2937]">
                  {feature.title}
                </h3>
                <p className="text-[#6B7280]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-[#F1F0FB] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#8B5CF6]/5" />
        <div className="container max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-on-scroll opacity-0 text-center bg-white/80 p-6 rounded-xl border border-[#E5DEFF]"
                data-animation="fade-in-blur"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-heading text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#6B7280]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-[#F1F0FB] opacity-70" />
        <div className="container max-w-6xl mx-auto text-center animate-on-scroll opacity-0 relative" data-animation="fade-in-up">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
            Ready to Transform Your Research?
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto mb-8">
            Join thousands of researchers who are already using our platform to advance
            their AI research.
          </p>
          <button className="group px-8 py-3 rounded-lg bg-[#8B5CF6] text-white font-medium hover:bg-[#7C3AED] transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
            Get Started Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
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

export default Index;
