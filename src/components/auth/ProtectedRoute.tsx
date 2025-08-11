import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { validateUserSession, UserRole } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  fallbackPath?: string;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
  fallbackPath = "/login",
}: ProtectedRouteProps) {
  const [user, setUser] = useState<UserRole | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { isValid, user, isAdmin } = await validateUserSession();

        setIsValid(isValid);
        setUser(user);
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error("Error validating session:", error);
        setIsValid(false);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#121218]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#7b68ee]" />
          <p className="text-white">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect to fallback if not authenticated
  if (!isValid || !user) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Check admin requirement
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
