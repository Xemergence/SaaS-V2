import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NonAdminDashboard from "./NonAdminDashboard";
import { validateUserSession, UserRole } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function DashboardLayout() {
  const [user, setUser] = useState<UserRole | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { isValid, user, isAdmin } = await validateUserSession();

        // Special case for "Tester one" - grant admin access
        const isTesterOne =
          user?.first_name === "Tester" && user?.last_name === "one";
        const finalIsAdmin = isAdmin || isTesterOne;

        setIsValid(isValid);
        setUser(user);
        setIsAdmin(finalIsAdmin);
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

  // Redirect to login if not authenticated
  if (!isValid || !user) {
    return <Navigate to="/login" replace />;
  }

  // Show non-admin dashboard for regular users
  if (!isAdmin) {
    return <NonAdminDashboard />;
  }

  // Show full admin dashboard
  return (
    <div className="flex h-screen bg-[#121218] flex-col md:flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
