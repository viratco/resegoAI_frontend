import { Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, LogOut, User } from "lucide-react"
import logo from '/logo.png'

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Hide navbar on auth pages
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
  if (isAuthPage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-center gap-2">
            <Link to="/" className="flex items-center justify-center">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-10 w-auto my-2"
              />
            </Link>
            
            <h1 className="text-2xl font-bold text-[#8B5CF6] font-quicksand tracking-wide">
              Resego AI
            </h1>

            {user && (
              <div className="hidden md:flex items-center justify-center gap-8">
                <Link 
                  to="/research" 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Research
                </Link>
                <Link 
                  to="/inventory" 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Inventory
                </Link>
              </div>
            )}
          </div>
          
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 hover:bg-gray-100/50"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <User className="h-4 h-4" />
                    </div>
                    <span>{user.email?.split('@')[0]}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </Button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">
                        Signed in as <span className="font-medium text-gray-900">{user.email}</span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors group"
                      >
                        <LogOut className="w-4 h-4 group-hover:text-red-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/signup" className="ml-4">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
