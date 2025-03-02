import { useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const SignUpConfirmation = () => {
  const location = useLocation();
  const { email, message } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1F0FB] via-white to-[#E5DEFF]">
      <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
      <div className="w-full max-w-md p-8 mx-4">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-[#E5DEFF] text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
          <p className="text-gray-600 mb-6">
            We've sent a confirmation link to:
            <br />
            <span className="font-medium text-primary">{email}</span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            {message || "Please verify your email address to complete your registration."}
          </p>
          
          <div className="space-y-4">
            <Link to="/signin">
              <Button variant="outline" className="w-full">
                Return to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpConfirmation; 