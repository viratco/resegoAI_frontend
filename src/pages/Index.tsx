
import { Brain, ChartLine, Database, Layers, Network } from "lucide-react";
import { useEffect, useRef } from "react";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create observer with better options for smoother animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Cast the target to HTMLElement to access dataset
          const element = entry.target as HTMLElement;
          // Only add class if element is not already animated
          if (entry.isIntersecting && !element.classList.contains("has-animated")) {
            const animationClass = element.dataset.animation || "fade-in";
            element.classList.add(animationClass);
            element.classList.add("has-animated");
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      if (!el.classList.contains("has-animated")) {
        observerRef.current?.observe(el);
      }
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
        <div className="absolute inset-0 bg-gradient-to-b from-accent to-background -z-10" />
        <div className="container max-w-6xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0" data-animation="fade-in-up">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 inline-block floating">
              Advancing AI Research
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-balance">
              Discover the Future of{" "}
              <span className="text-primary">AI Research</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore cutting-edge AI research papers, collaborate with experts, and
              stay ahead in the rapidly evolving field of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition-opacity">
                Start Exploring
              </button>
              <button className="px-8 py-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
                How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0" data-animation="fade-in-up">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 inline-block">
              Features
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
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
                data-animation={index % 2 === 0 ? "fade-in-left" : "fade-in-right"}
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
      <section className="py-20 px-4 bg-accent">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-on-scroll opacity-0 text-center"
                data-animation="scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-heading text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto text-center animate-on-scroll opacity-0" data-animation="fade-in-up">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Research?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of researchers who are already using Resego to advance
            their AI research.
          </p>
          <button className="px-8 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition-opacity">
            Get Started Now
          </button>
        </div>
      </section>
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
