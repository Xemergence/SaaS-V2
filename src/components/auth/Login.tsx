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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        alert(`Failed to sign in: ${error.message}`);
        return;
      }

      if (data.user) {
        // Check if email is verified
        if (!data.user.email_confirmed_at) {
          alert(
            "Please verify your email address before signing in. Check your email for a verification link.",
          );
          return;
        }

        // Record session info
        try {
          await supabase.from("user_sessions").insert({
            user_id: data.user.id,
            ip_address: "client-side",
            user_agent: navigator.userAgent,
          });
        } catch (sessionError) {
          console.warn("Failed to record session:", sessionError);
          // Don't block login if session recording fails
        }

        // Create or update user profile
        try {
          const { error: profileError } = await supabase.from("users").upsert(
            {
              id: data.user.id,
              email: data.user.email,
              first_name: data.user.user_metadata?.first_name,
              last_name: data.user.user_metadata?.last_name,
              avatar_url: data.user.user_metadata?.avatar_url,
              updated_at: new Date().toISOString(),
              role: "user", // Ensure role is always set to user by default
            },
            {
              onConflict: "id",
            },
          );

          if (profileError) {
            console.warn("Failed to update user profile:", profileError);
          }
        } catch (profileError) {
          console.warn("Failed to create/update user profile:", profileError);
        }

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to sign in. Please check your credentials.");
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
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Button
                  variant="link"
                  className="h-auto p-0 text-sm text-[#7b68ee] hover:text-[#6a5acd]"
                >
                  Forgot password?
                </Button>
              </div>
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
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center w-full text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup">
              <Button
                variant="link"
                className="p-0 text-[#7b68ee] hover:text-[#6a5acd]"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
