import { Button } from "@/UIComponents";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getCurrentUserWithRole,
  getUserDisplayName,
  getUserInitials,
  getAvatarSeed,
  UserRole,
} from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/UIComponents";
import {
  ArrowRight,
  Twitter,
  Youtube,
  Instagram,
  Target,
  Clock,
  Brain,
  Users,
  FileText,
  TrendingUp,
  Bot,
  Zap,
  MessageSquare,
  Image,
  Code,
  Database,
  Cpu,
  ShoppingCart,
  Package,
  Home,
  Bell,
  Settings,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  const [selectedTeamMember, setSelectedTeamMember] = useState(0);
  const [user, setUser] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUserWithRole();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const teamMembers = [
    {
      name: "Jether Panton",
      role: "Strategy, PMO, AI Integration & Cross-domain Prototyping",
      description:
        "Project creator focusing on PMO, AI integration, cross-domain prototyping, and emerging technologies. Researches and develops blockchain, IoT, data analytics, and AI systems while leading strategic initiatives and managing complex technology portfolios.",
      linkedin: "https://www.linkedin.com/in/jetherpantonainnovation/",
      summary:
        "Strategic technology leader specializing in PMO, AI integration, and cross-domain prototyping. Expert in blockchain research, emerging technologies, and managing complex technology initiatives that drive digital transformation and innovation.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jether",
    },
    {
      name: "Sebastian Vissepo",
      role: "Security & Deployment Consultant",
      description:
        "Consultant providing expertise on security and deployment strategies, leveraging extensive experience to discuss and refine ideas.",
      linkedin: "https://www.linkedin.com/in/sebavissepo/",
      summary:
        "Cybersecurity expert and deployment specialist with extensive experience in secure system architecture, cloud infrastructure, and enterprise-level security implementations.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sebastian",
    },
    {
      name: "Johan Lingani",
      role: "Social Media & Web Development, AI Prompt Engineering",
      description:
        "Focused on social media strategy, web development, AI research through prompt engineering, and wireframing.",
      linkedin: "https://www.linkedin.com/in/johan-lingani-5788a953/",
      summary:
        "Digital marketing strategist and web developer specializing in social media optimization, user experience design, and AI-powered content creation strategies.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johan",
    },
  ];

  return (
    <div className="min-h-screen bg-[#121218] text-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7b68ee] to-[#9b59b6] flex items-center justify-center">
            <span className="text-white font-bold text-sm">xE</span>
          </div>
          <span className="text-xl font-bold text-white">xEmergence</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/products"
            className="text-white hover:text-[#7b68ee] transition-colors"
          >
            Products
          </Link>
          <a
            href="#"
            className="text-white hover:text-[#7b68ee] transition-colors"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-white hover:text-[#7b68ee] transition-colors"
          >
            Company
          </a>
          <a
            href="#"
            className="text-white hover:text-[#7b68ee] transition-colors"
          >
            Contact Us
          </a>
          <div className="h-6 w-px bg-[#2a2a3a]"></div>
          <Link
            to="/products"
            className="text-white hover:text-[#7b68ee] transition-colors font-medium"
          >
            3D Products Sale
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(user)}`}
                  alt="User Avatar"
                />
                <AvatarFallback className="bg-[#7b68ee] text-white text-xs font-medium">
                  {getUserInitials(user)}
                </AvatarFallback>
              </Avatar>
              <span className="text-white font-medium">
                {getUserDisplayName(user)}
              </span>
              <Link to="/dashboard">
                <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white rounded-full">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-[#1e1e2d]"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white rounded-full">
                  <span>Sign Up</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <div className="text-[#7b68ee] uppercase tracking-wider text-sm font-medium mb-2">
            POWERING PROGRESS
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Empowering Small Teams & Local Businesses
          </h1>
          <p className="text-lg text-gray-300">
            Transform your data into digital solutions with our comprehensive
            control tower platform. Aggregate and visualize critical business
            metrics from your digital components, enabling real-time insights,
            cost management, and operational efficiency for small businesses,
            individuals, and teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/signup">
              <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white w-full sm:w-auto px-8 py-6 text-lg rounded-full">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="text-sm text-gray-300 mt-4">
            Designed for innovators, small teams, and growing businesses
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Badge icon="infinity" text="For Innovators" />
            <Badge icon="code" text="Digital Integrations" />
            <Badge icon="users" text="For Small Teams" />
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative bg-[#2a2a3a] p-4 rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=60&fm=webp"
              alt="xEmergence Dashboard Preview"
              className="relative rounded-lg shadow-2xl border border-[#3a3a4a] w-full max-w-xl"
              loading="lazy"
              decoding="async"
              width="600"
              height="400"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1a1a24]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Cutting-Edge Features with No Compromises at 100x Less Cost
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModernFeatureCard
              title="Stay Focused"
              description="Centralize new issues and ideas in one place. Concentrate on the essentials while eliminating distractions from your workflow."
              iconColor="#9aff76"
              icon={<Target className="h-6 w-6" />}
            />
            <ModernFeatureCard
              title="Save Time"
              description="Define and organize complex projects with our comprehensive dashboard tools, streamlining your workflow and boosting productivity."
              iconColor="#ff7676"
              icon={<Clock className="h-6 w-6" />}
            />
            <ModernFeatureCard
              title="AI-Powered Co-Creation"
              description="Keep work flowing seamlessly with our AI-powered analytics and insights, eliminating heavy file management and accelerating decision-making."
              iconColor="#a876ff"
              icon={<Brain className="h-6 w-6" />}
            />
            <ModernFeatureCard
              title="Monitor & Engage Users"
              description="Track website traffic, revenue metrics, operating costs, and database usage with real-time updates and comprehensive analytics."
              iconColor="#76ffb8"
              icon={<Users className="h-6 w-6" />}
            />
            <ModernFeatureCard
              title="Unified Documentation Hub"
              description="Consolidate all your business metrics, documentation, and insights in one centralized location for seamless access and management."
              iconColor="#c576ff"
              icon={<FileText className="h-6 w-6" />}
            />
            <ModernFeatureCard
              title="Stay Competitive"
              description="Maintain your competitive edge with cutting-edge tools, real-time analytics, and actionable insights that drive business growth."
              iconColor="#76e4ff"
              icon={<TrendingUp className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-20 bg-[#121218]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Your Favorite AI Tools, Integrated
            </h2>
            <p className="text-gray-300 mb-8">
              xEmergence seamlessly integrates with the tools you already love,
              enabling smooth transitions across your work processes and
              maximizing operational efficiency.
            </p>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">
                Centralized Control Tower
              </h3>
              <p className="text-gray-300 mb-6">
                Our platform serves as a unified control tower, powered by
                advanced AI technology, designed to transform data from your
                digital components into actionable business intelligence. By
                centralizing all your tools and platforms under one intelligent
                system, we empower small businesses, individuals, and teams with
                seamless integration, real-time insights, and automated
                workflows.
              </p>
              <p className="text-gray-300">
                Access our comprehensive suite of AI-powered tools designed to
                streamline operations, from intelligent scheduling and analytics
                to automated notifications and security management. Plus,
                explore our array of US-designed and manufactured 3D products to
                enhance your physical business presence.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AIToolIconCard
              icon={<Bot className="h-6 w-6" />}
              name="Scheduling"
              color="#9aff76"
            />
            <AIToolIconCard
              icon={<MessageSquare className="h-6 w-6" />}
              name="AI Chat"
              color="#76e4ff"
            />
            <AIToolIconCard
              icon={<TrendingUp className="h-6 w-6" />}
              name="Analytics"
              color="#a876ff"
            />
            <AIToolIconCard
              icon={<Bot className="h-6 w-6" />}
              name="AI Assistant"
              color="#ff7676"
            />
            <AIToolIconCard
              icon={<Bell className="h-6 w-6" />}
              name="Notifications"
              color="#ffb876"
            />
            <AIToolIconCard
              icon={<Settings className="h-6 w-6" />}
              name="Configuration"
              color="#c576ff"
            />
            <AIToolIconCard
              icon={<Shield className="h-6 w-6" />}
              name="Security"
              color="#9aff76"
            />
            <AIToolIconCard
              icon={<Zap className="h-6 w-6" />}
              name="Automation"
              color="#76e4ff"
            />
            <AIToolIconCard
              icon={<Database className="h-6 w-6" />}
              name="Data Management"
              color="#ff7676"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#1a1a24]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-[#7b68ee] uppercase tracking-wider text-sm font-medium mb-2">
              PRICED FAIRLY
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Free for Solo Users, Affordable for Growing Businesses
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              tier="MAX"
              price="Coming Fall 2025!"
              features={[
                "Business intelligence dashboard",
                "Platforms and extension automation",
                "Social media integration",
                "Secure dashboard access",
                "Unlimited members",
              ]}
              ctaText="Get started with MAX"
            />
            <PricingCard
              tier="PLUS"
              price="Coming Fall 2025!"
              features={[
                "AI automation",
                "Local payment methods",
                "Platform support",
                "Simulation Support",
                "2-4 members",
              ]}
              ctaText="Get started with Plus"
            />
            <PricingCard
              tier="FREE"
              price="Coming Fall 2025!"
              subtext="For Everyone"
              features={[
                "Webpage integration",
                "General analytics",
                "Reporting",
                "Chat support",
                "1 member",
              ]}
              ctaText="Get started with FREE"
            />
          </div>
        </div>
      </section>

      {/* Full-Width Separator Line */}
      <div className="w-full border-t border-[#2a2a3a]"></div>

      {/* Team Section */}
      <section className="py-20 bg-[#1a1a24]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Team members
              </h2>
              <div className="space-y-6">
                {teamMembers.map((member, index) => (
                  <TeamMember
                    key={index}
                    name={member.name}
                    role={member.role}
                    description={member.description}
                    linkedin={member.linkedin}
                    isSelected={selectedTeamMember === index}
                    onClick={() => setSelectedTeamMember(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="bg-[#1e1e2d] p-8 rounded-lg">
              <div className="w-full">
                <LinkedInProfileCard member={teamMembers[selectedTeamMember]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Integrations Section */}
      <section className="py-20 bg-[#121218]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Industry-Specific Platform Integrations
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Discover our specialized platforms designed to enhance specific
              industries. We build and sponsor industry-focused solutions that
              empower professionals and small businesses with data
              visualization, automation, AI, and advanced features. Our
              template-driven approach accelerates development while maintaining
              affordability through tiered pricing systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <PlatformCard
              name="Education"
              color="#9aff76"
              icon={<Brain className="h-6 w-6" />}
            />
            <PlatformCard
              name="Real Estate"
              color="#a876ff"
              icon={<Home className="h-6 w-6" />}
            />
            <PlatformCard
              name="Services"
              color="#76e4ff"
              icon={<Package className="h-6 w-6" />}
            />
            <PlatformCard
              name="Pregnancy Platform"
              color="#ff7676"
              icon={<Users className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Full-Width Separator Line */}
      <div className="w-full border-t border-[#2a2a3a]"></div>

      {/* Products Navigation Section */}
      <section className="py-20 bg-[#1a1a24]">
        <div className="container mx-auto px-4 text-center">
          <div className="text-[#7b68ee] uppercase tracking-wider text-sm font-medium mb-2">
            EXPLORE OUR PRODUCTS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Business with Our Products?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Discover our range of innovative, US-designed and manufactured
            products that enhance your business operations. From custom 3D
            printed solutions to IoT devices and NFC technology, each product is
            crafted to integrate seamlessly with your digital transformation
            journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products">
              <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white px-8 py-6 text-lg rounded-full flex items-center gap-3">
                <ShoppingCart className="h-5 w-5" />
                Browse Products
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              to="/products"
              className="text-[#7b68ee] hover:text-white transition-colors flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121218] py-12 border-t border-[#2a2a3a]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7b68ee] to-[#9b59b6] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">xE</span>
                </div>
                <span className="text-xl font-bold text-white">xEmergence</span>
              </Link>
              <p className="text-gray-300 mb-4">
                Unleash the full potential of your ideas with our accelerated
                digital solutions, transforming data into actionable insights
                and driving your success forward through innovative technology
                and US-manufactured products.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    For Designers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    For Developers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    For Managers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2a2a3a] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              TrendBlend Inc 2023 All Rights Reserved
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-[#1e1e2d] p-6 rounded-lg border border-[#2a2a3a] hover:border-[#7b68ee] transition-all">
      <div className="mb-6 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center text-white">
        {title}
      </h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
}

interface ModernFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  highlighted?: boolean;
}

function ModernFeatureCard({
  title,
  description,
  icon,
  iconColor,
  highlighted = false,
}: ModernFeatureCardProps) {
  return (
    <div className="bg-[#2a2a3a] p-6 rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-[#353545] transition-colors cursor-pointer">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: iconColor + "40",
          color: iconColor,
        }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white text-center">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
}

interface TeamMemberProps {
  name: string;
  role: string;
  description?: string;
  linkedin?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

function TeamMember({
  name,
  role,
  description,
  linkedin,
  isSelected = false,
  onClick,
}: TeamMemberProps) {
  return (
    <div
      className={`flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? "bg-[#7b68ee]/20 border border-[#7b68ee]"
          : "hover:bg-[#2a2a3a]"
      }`}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full bg-[#2a2a3a] flex items-center justify-center text-white font-bold flex-shrink-0">
        {name.charAt(0)}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-white">{name}</h3>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077b5] hover:text-[#0077b5]/80"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </a>
          )}
        </div>
        <p className="text-sm text-gray-300">{role}</p>
        {description && (
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

interface AIToolIconCardProps {
  icon: React.ReactNode;
  name: string;
  color: string;
}

function AIToolIconCard({ icon, name, color }: AIToolIconCardProps) {
  return (
    <div className="bg-[#2a2a3a] p-4 rounded-lg flex flex-col items-center justify-center gap-3 hover:bg-[#353545] transition-colors">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: color + "40",
          color: color,
        }}
      >
        {icon}
      </div>
      <span className="text-sm text-white font-medium text-center">{name}</span>
    </div>
  );
}

interface PlatformCardProps {
  name: string;
  color: string;
  icon: React.ReactNode;
}

function PlatformCard({ name, color, icon }: PlatformCardProps) {
  return (
    <div className="bg-[#2a2a3a] p-6 rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-[#353545] transition-colors">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: color + "40",
          color: color,
        }}
      >
        {icon}
      </div>
      <span className="text-white font-medium text-center">{name}</span>
    </div>
  );
}

interface PricingCardProps {
  tier: string;
  price: string;
  subtext?: string;
  features: string[];
  ctaText: string;
  featured?: boolean;
}

function PricingCard({
  tier,
  price,
  subtext,
  features,
  ctaText,
  featured = false,
}: PricingCardProps) {
  const handleClick = () => {
    // Redirect to a blank page (placeholder for Stripe checkout)
    window.open("about:blank", "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-[#1e1e2d] p-8 rounded-lg border border-[#2a2a3a] hover:border-[#7b68ee] transition-all cursor-pointer flex flex-col h-full`}
    >
      <div className="text-center mb-6">
        <div className="text-[#7b68ee] uppercase tracking-wider text-sm font-medium mb-2">
          {tier}
        </div>
        <div className="text-2xl font-bold text-white">{price}</div>
        {subtext && <div className="text-gray-300 mt-1">{subtext}</div>}
      </div>

      <div className="flex justify-center gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${featured ? "bg-[#7b68ee] text-white" : "bg-[#2a2a3a] text-gray-300"}`}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-full ${!featured ? "bg-[#7b68ee] text-white" : "bg-[#2a2a3a] text-gray-300"}`}
        >
          Yearly
        </button>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="rounded-full bg-[#7b68ee] bg-opacity-20 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#7b68ee]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-white">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`py-3 px-6 rounded-full flex items-center justify-center gap-2 ${featured ? "bg-[#7b68ee] hover:bg-[#6a5acd] text-white" : "bg-[#2a2a3a] hover:bg-[#353545] text-white"}`}
      >
        {ctaText}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Badge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="bg-[#1e1e2d] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm">
      {icon === "infinity" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-[#7b68ee]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
        </svg>
      )}
      {icon === "code" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-[#7b68ee]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )}
      {icon === "users" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-[#7b68ee]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )}
      <span>{text}</span>
    </div>
  );
}

function GlowingIcon({
  color = "#7b68ee",
  size = "md",
}: {
  color?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={`relative ${size === "sm" ? "w-8 h-8" : "w-16 h-16"} flex items-center justify-center`}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color, opacity: 0.2, filter: "blur(8px)" }}
      ></div>
      <div
        className={`relative ${size === "sm" ? "w-6 h-6" : "w-12 h-12"} rounded-full flex items-center justify-center`}
        style={{ backgroundColor: color, opacity: 0.3 }}
      >
        <div
          className={`${size === "sm" ? "w-4 h-4" : "w-8 h-8"} rounded-full flex items-center justify-center`}
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

function AIToolCard({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="bg-[#1e1e2d] p-4 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-[#2a2a3a] transition-colors">
      {icon}
      <span className="text-xs text-gray-300 font-medium">{name}</span>
    </div>
  );
}

interface LinkedInProfileCardProps {
  member: {
    name: string;
    role: string;
    avatar: string;
    linkedin: string;
    summary: string;
  };
}

function LinkedInProfileCard({ member }: LinkedInProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-[#0077b5] h-16 relative">
        <div className="absolute -bottom-8 left-6">
          <div className="w-16 h-16 rounded-full border-4 border-white bg-[#2a2a3a] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {member.name.charAt(0)}
          </div>
        </div>
      </div>
      <div className="pt-12 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
        <p className="text-[#0077b5] font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {member.summary}
        </p>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0077b5] text-white py-2 px-4 rounded-md hover:bg-[#0077b5]/90 transition-colors font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
          </svg>
          View LinkedIn Profile
        </a>
      </div>
    </div>
  );
}

function getRandomColor() {
  const colors = [
    "#7b68ee",
    "#9aff76",
    "#ff7676",
    "#76ffb8",
    "#a876ff",
    "#76e4ff",
    "#ffb876",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
