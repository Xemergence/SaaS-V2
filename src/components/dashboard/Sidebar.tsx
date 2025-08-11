import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { signOutUser } from "@/lib/auth";
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Settings,
  CircuitBoard,
  BrainCircuit,
  LogOut,
  MessageSquareText,
  AppWindow,
  Share2,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/UIComponents";
import { useState } from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function NavItem({ icon, label, href, active }: NavItemProps) {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 font-normal",
          active
            ? "bg-[#2a2a3a] text-white"
            : "hover:bg-[#2a2a3a]/50 text-white",
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Financial",
      href: "/dashboard/financial",
    },
    {
      icon: <Calendar size={20} />,
      label: "Calendar",
      href: "/dashboard/calendar",
    },
    {
      icon: <BrainCircuit size={20} />,
      label: "AI Overview",
      href: "/dashboard/ai-overview",
    },
    {
      icon: <AppWindow size={20} />,
      label: "AI Apps",
      href: "/dashboard/ai-apps",
    },
    {
      icon: <MessageSquareText size={20} />,
      label: "AI Chat",
      href: "/dashboard/ai-chat",
    },
    {
      icon: <CircuitBoard size={20} />,
      label: "Sensors",
      href: "/dashboard/sensors",
    },
    {
      icon: <Share2 size={20} />,
      label: "Social Media",
      href: "/dashboard/social-media",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile menu button (only visible on small screens)
  const mobileMenuButton = (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMobileMenu}
        className="bg-[#2a2a3a] text-white hover:bg-[#353545]"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
    </div>
  );

  return (
    <>
      {mobileMenuButton}
      <aside
        className={cn(
          "border-r border-[#2a2a3a] bg-[#1e1e2d] flex flex-col",
          "fixed md:static top-0 left-0 z-40 h-full transition-transform duration-300 ease-in-out",
          "w-64",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0",
        )}
      >
        <Link to="/" className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7b68ee] to-[#9b59b6] flex items-center justify-center">
            <span className="text-white font-bold text-xs">xE</span>
          </div>
          <h1 className="text-xl font-bold text-white">xEmergence</h1>
        </Link>
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
            />
          ))}
        </nav>
        <div className="p-4 border-t border-[#2a2a3a]">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white hover:bg-[#2a2a3a]"
            onClick={signOutUser}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}
