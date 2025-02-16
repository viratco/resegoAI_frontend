import { Brain, ChartLine, Database, Layers, Network, ArrowRight, Sparkles, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-accent/50 -z-10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MmgtNHYtMnptMC04aDR2MmgtNHYtMnptMCAxNmg0djJoLTR2LTJ6bS0xNy0xMmg0djJoLTR2LTJ6bTAtOGg0djJoLTR2LTJ6bTAgMTZoNHYyaC00di0yem0wLThoNHYyaC00di0yem0wLThoNHYyaC00di0yem0wIDE2aDR2MmgtNHYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20 -z-10" />
        <div className="container max-w-6xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0" data-animation="fade-in-blur">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 inline-block floating">
              <Sparkles className="w-4 h-4 inline-block mr-2" />
              Advancing AI Research
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-balance bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Discover the Future of{" "}
              <span className="text-primary">AI Research</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore cutting-edge AI research papers, collaborate with experts, and
              stay ahead in the rapidly evolving field of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition-all hover:scale-105 duration-300 flex items-center justify-center gap-2">
                Start Exploring
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-all hover:scale-105 duration-300">
                How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MmgtNHYtMnptMC04aDR2MmgtNHYtMnptMCAxNmg0djJoLTR2LTJ6bS0xNy0xMmg0djJoLTR2LTJ6bTAtOGg0djJoLTR2LTJ6bTAgMTZoNHYyaC00di0yem0wLThoNHYyaC00di0yem0wLThoNHYyaC00di0yem0wIDE2aDR2MmgtNHYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0" data-animation="fade-in-up">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 inline-block">
              <Sparkles className="w-4 h-4 inline-block mr-2" />
              Features
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access powerful tools and features designed specifically for AI
              researchers and enthusiasts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-on-scroll opacity-0 glass-card p-6 rounded-xl"
                data-animation="fade-in-blur"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-accent relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5" />
        <div className="container max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-on-scroll opacity-0 text-center"
                data-animation="fade-in-blur"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-heading text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MmgtNHYtMnptMC04aDR2MmgtNHYtMnptMCAxNmg0djJoLTR2LTJ6bS0xNy0xMmg0djJoLTR2LTJ6bTAtOGg0djJoLTR2LTJ6bTAgMTZoNHYyaC00di0yem0wLThoNHYyaC00di0yem0wLThoNHYyaC00di0yem0wIDE2aDR2MmgtNHYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        <div className="container max-w-6xl mx-auto text-center animate-on-scroll opacity-0" data-animation="fade-in-up">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Ready to Transform Your Research?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of researchers who are already using our platform to advance
            their AI research.
          </p>
          <button className="group px-8 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition-all hover:scale-105 duration-300 flex items-center justify-center gap-2 mx-auto">
            Get Started Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 ${
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
