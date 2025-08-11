import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/UIComponents";
import { Input } from "@/UIComponents";
import { Label } from "@/UIComponents";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { CheckCircle, Mail } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const firstName = name.split(" ")[0] || "";
      const lastName = name.split(" ").slice(1).join(" ") || "";

      // Register with Supabase - require email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        console.error("Signup error:", error);
        alert(`Failed to create account: ${error.message}`);
        return;
      }

      if (data.user) {
        // Only create user profile if email is confirmed or if it's an immediate confirmation
        if (
          data.user.email_confirmed_at ||
          !data.user.identities ||
          data.user.identities.length === 0
        ) {
          try {
            const { error: profileError } = await supabase
              .from("users")
              .insert({
                id: data.user.id,
                email: data.user.email,
                first_name: firstName,
                last_name: lastName,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                role: "user", // Explicitly set role to user for all new sign-ups
              });

            if (profileError) {
              console.warn("Failed to create user profile:", profileError);
            }
          } catch (profileError) {
            console.warn("Failed to create user profile:", profileError);
          }
        }

        // Show success message instead of navigating immediately
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#121218] px-4 py-8">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7b68ee] to-[#9b59b6] flex items-center justify-center">
            <span className="text-white font-bold text-xs">xE</span>
          </div>
          <span className="text-xl font-bold text-white">xEmergence</span>
        </Link>
      </div>

      <Card className="w-full max-w-md bg-[#1e1e2d] border-[#2a2a3a]">
        {isSuccess ? (
          <>
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#7b68ee]/20 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-[#7b68ee]" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-gray-300">
                We've sent a verification link to {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-[#2a2a3a] p-4 rounded-lg">
                <Mail className="h-6 w-6 text-[#7b68ee] mx-auto mb-2" />
                <p className="text-sm text-gray-300 mb-2">
                  Please check your email and click the verification link to
                  activate your account.
                </p>
                <p className="text-xs text-gray-400">
                  Don't see the email? Check your spam folder or try signing up
                  again.
                </p>
              </div>
              <Link to="/login">
                <Button className="w-full bg-[#7b68ee] hover:bg-[#6a5acd] text-white rounded-full">
                  Back to Sign In
                </Button>
              </Link>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-white">
                Create an Account
              </CardTitle>
              <CardDescription className="text-gray-300">
                Sign up to access the xEmergence dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#7b68ee] hover:bg-[#6a5acd] text-white rounded-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-center w-full text-gray-300">
                Already have an account?{" "}
                <Link to="/login">
                  <Button
                    variant="link"
                    className="p-0 text-[#7b68ee] hover:text-[#6a5acd]"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
