import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy load pages
const LandingPage = lazy(() => import("./components/landing/LandingPage"));
const Login = lazy(() => import("./components/auth/Login"));
const SignUp = lazy(() => import("./components/auth/SignUp"));
const Products = lazy(() => import("./components/Products"));
const CustomPrint = lazy(() => import("./components/CustomPrint"));
const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const Financial = lazy(() => import("./components/dashboard/Financial"));
const CalendarView = lazy(() => import("./components/dashboard/CalendarView"));
const AIOverview = lazy(() => import("./components/dashboard/AIOverview"));
const AIApps = lazy(() => import("./components/dashboard/AIApps"));
const AIChat = lazy(() => import("./components/dashboard/AIChat"));
const Sensors = lazy(() => import("./components/dashboard/Sensors"));
const SocialMedia = lazy(() => import("./components/dashboard/SocialMedia"));
const Settings = lazy(() => import("./components/dashboard/Settings"));

function App() {
  // Dev-only Tempo routes loader (safe-guarded)
  let TempoRoutes: any = () => null;
  if (import.meta.env.DEV) {
    const [Comp, setComp] = useState<React.FC>(() => () => null);
    useEffect(() => {
      const tempoEnabled =
        import.meta.env.VITE_TEMPO === "true" || import.meta.env.TEMPO === "true";
      if (!tempoEnabled) return;
      import("tempo-routes")
        .then((mod: any) => {
          const R = typeof mod?.default === "function" ? mod.default : mod?.routes;
          setComp(() => (R ? R : () => null));
        })
        .catch(() => setComp(() => () => null));
    }, []);
    TempoRoutes = Comp;
  }

  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        {import.meta.env.DEV && <TempoRoutes />}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/custom-print" element={<CustomPrint />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="financial" element={<Financial />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="ai-overview" element={<AIOverview />} />
            <Route path="ai-apps" element={<AIApps />} />
            <Route path="ai-chat" element={<AIChat />} />
            <Route path="sensors" element={<Sensors />} />
            <Route path="social-media" element={<SocialMedia />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
