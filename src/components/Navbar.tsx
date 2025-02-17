
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            AI Research
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">
              How It Works
            </Link>
            <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>

          <button className="md:hidden p-2">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
