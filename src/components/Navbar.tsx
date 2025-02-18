
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) return null;

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
            <Link 
              to="/" 
              className={`text-gray-600 hover:text-primary transition-colors ${
                location.pathname === "/" ? "text-primary" : ""
              }`}
            >
              Home
            </Link>
            <Link 
              to="/how-it-works" 
              className={`text-gray-600 hover:text-primary transition-colors ${
                location.pathname === "/how-it-works" ? "text-primary" : ""
              }`}
            >
              How It Works
            </Link>
            <Link to="/login">
              <Button variant="outline" className="mr-2">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className={`text-gray-600 hover:text-primary transition-colors ${
                  location.pathname === "/" ? "text-primary" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/how-it-works" 
                className={`text-gray-600 hover:text-primary transition-colors ${
                  location.pathname === "/how-it-works" ? "text-primary" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full mb-2">Sign In</Button>
              </Link>
              <Link 
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
