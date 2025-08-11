import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";

// Lazy load components with Vite-compatible chunk names
const LandingPage = lazy(() => import("./components/landing/LandingPage"));
const Login = lazy(() => import("./components/auth/Login"));
const SignUp = lazy(() => import("./components/auth/SignUp"));
const Products = lazy(() => import("./components/Products"));
const CustomPrint = lazy(() => import("./components/CustomPrint"));
const DashboardLayout = lazy(
  () => import("./components/dashboard/DashboardLayout"),
);
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const Financial = lazy(() => import("./components/dashboard/Financial"));
const CalendarView = lazy(() => import("./components/dashboard/CalendarView"));
const AIOverview = lazy(() => import("./components/dashboard/AIOverview"));
const AIApps = lazy(() => import("./components/dashboard/AIApps"));
const AIChat = lazy(() => import("./components/dashboard/AIChat"));
const Sensors = lazy(() => import("./components/dashboard/Sensors"));
const SocialMedia = lazy(() => import("./components/dashboard/SocialMedia"));
const Settings = lazy(() => import("./components/dashboard/Settings"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));

function App() {
  // Tempo-related state and logic only in development
  let tempoRoutes: any = null;
  let tempoRoutesLoaded = true;
  let isTempoEnabled = false;
  let TempoRoutes = () => null;

  if (import.meta.env.DEV) {
    const [tempoRoutesState, setTempoRoutes] = useState<any>(null);
    const [tempoRoutesLoadedState, setTempoRoutesLoaded] = useState(false);
    const [isTempoEnabledState, setIsTempoEnabled] = useState(false);

    tempoRoutes = tempoRoutesState;
    tempoRoutesLoaded = tempoRoutesLoadedState;
    isTempoEnabled = isTempoEnabledState;

    // Detect if Tempo is enabled and load routes defensively
    useEffect(() => {
      const tempoEnabled =
        import.meta.env.VITE_TEMPO === "true" ||
        import.meta.env.TEMPO === "true";

      setIsTempoEnabled(tempoEnabled);

      if (tempoEnabled) {
        // Defensive loader for tempo-routes with try/catch
        import("tempo-routes")
          .then((routesModule) => {
            console.log(
              "Tempo routes module loaded:",
              Object.keys(routesModule),
            );

            // Support both component export and route array export
            let routes = null;

            if (routesModule.default) {
              routes = routesModule.default;
            } else if (routesModule.routes) {
              routes = routesModule.routes;
            } else if (Array.isArray(routesModule)) {
              routes = routesModule;
            } else {
              // Try to find any array or component in the module
              const moduleKeys = Object.keys(routesModule);
              for (const key of moduleKeys) {
                if (
                  Array.isArray(routesModule[key]) ||
                  typeof routesModule[key] === "function"
                ) {
                  routes = routesModule[key];
                  break;
                }
              }
            }

            if (routes) {
              setTempoRoutes(routes);
              console.log(
                "Tempo routes loaded successfully",
                typeof routes === "function"
                  ? "(component)"
                  : `(${Array.isArray(routes) ? routes.length : "unknown"} routes)`,
              );
            } else {
              console.warn("No valid routes found in tempo-routes module");
              setTempoRoutes([]);
            }
          })
          .catch((error) => {
            console.warn(
              "Failed to load tempo routes:",
              error.message || error,
            );
            // Set empty routes to prevent infinite loading
            setTempoRoutes([]);
          })
          .finally(() => {
            setTempoRoutesLoaded(true);
          });
      } else {
        setTempoRoutesLoaded(true);
      }
    }, []);

    // Render tempo routes only after successful load
    TempoRoutes = () => {
      if (isTempoEnabled && tempoRoutes && tempoRoutesLoaded) {
        // Handle both component and route array exports
        if (typeof tempoRoutes === "function") {
          const TempoComponent = tempoRoutes;
          return <TempoComponent />;
        } else if (Array.isArray(tempoRoutes)) {
          return useRoutes(tempoRoutes);
        }
      }
      return null;
    };
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
        {/* Tempo routes - only render after successful load */}
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
