
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1F0FB] via-white to-[#E5DEFF]">
      <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
      <div className="w-full max-w-md p-8 mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">Create an account</h1>
          <p className="text-gray-600">Start your journey with us</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-[#E5DEFF]">
          <div className="space-y-4">
            <div className="space-y-2">
              <Input type="text" placeholder="Username" />
            </div>
            <div className="space-y-2">
              <Input type="email" placeholder="Email" />
            </div>
            <div className="space-y-2">
              <Input type="password" placeholder="Password" />
            </div>
            <Button className="w-full">Sign up</Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
