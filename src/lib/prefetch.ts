/**
 * Utility for prefetching components and routes
 */

// Prefetch dashboard components
export const prefetchDashboardComponents = () => {
  return Promise.all([
    import("../components/dashboard/Dashboard"),
    import("../components/dashboard/DashboardLayout"),
    import("../components/dashboard/Sidebar"),
    import("../components/dashboard/Header"),
  ]);
};

// Prefetch AI section components
export const prefetchAIComponents = () => {
  return Promise.all([
    import("../components/dashboard/AIOverview"),
    import("../components/dashboard/AIApps"),
    import("../components/dashboard/AIChat"),
  ]);
};

// Prefetch financial components
export const prefetchFinancialComponents = () => {
  return Promise.all([
    import("../components/dashboard/Financial"),
    import("../components/dashboard/CostBreakdown"),
    import("../components/dashboard/RevenueChart"),
  ]);
};

// Prefetch based on section
export const prefetchBySection = (section: string) => {
  switch (section) {
    case "dashboard":
      return prefetchDashboardComponents();
    case "ai":
      return prefetchAIComponents();
    case "financial":
      return prefetchFinancialComponents();
    default:
      return Promise.resolve();
  }
};
