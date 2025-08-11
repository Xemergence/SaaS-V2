import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/UIComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/UIComponents";
import { Button } from "@/UIComponents";
import { Progress } from "@/UIComponents";
import { Badge } from "@/UIComponents";
import {
  BarChart,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  TrendingUp,
  Users,
  MessageSquare,
  Share2,
  ThumbsUp,
  Eye,
  Clock,
  Globe,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

interface SocialAccount {
  id: string;
  platform: "twitter" | "instagram" | "facebook" | "linkedin" | "youtube";
  name: string;
  handle: string;
  followers: number;
  followersChange: number;
  engagement: number;
  engagementChange: number;
  connected: boolean;
  lastUpdated: string;
}

interface SocialPost {
  id: string;
  platform: "twitter" | "instagram" | "facebook" | "linkedin" | "youtube";
  content: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  engagement: number;
  image?: string;
}

interface AudienceData {
  platform:
    | "twitter"
    | "instagram"
    | "facebook"
    | "linkedin"
    | "youtube"
    | "all";
  ageGroups: { label: string; value: number }[];
  genderSplit: { label: string; value: number }[];
  topLocations: { location: string; value: number }[];
  activeHours: { hour: string; value: number }[];
}

const sampleAccounts: SocialAccount[] = [
  {
    id: "tw1",
    platform: "twitter",
    name: "Company Twitter",
    handle: "@companyname",
    followers: 12450,
    followersChange: 3.2,
    engagement: 2.8,
    engagementChange: 0.5,
    connected: true,
    lastUpdated: "10 minutes ago",
  },
  {
    id: "ig1",
    platform: "instagram",
    name: "Company Instagram",
    handle: "@companyname",
    followers: 24680,
    followersChange: 5.7,
    engagement: 4.2,
    engagementChange: 1.3,
    connected: true,
    lastUpdated: "25 minutes ago",
  },
  {
    id: "fb1",
    platform: "facebook",
    name: "Company Facebook",
    handle: "Company Name",
    followers: 35750,
    followersChange: -0.8,
    engagement: 1.9,
    engagementChange: -0.3,
    connected: true,
    lastUpdated: "1 hour ago",
  },
  {
    id: "li1",
    platform: "linkedin",
    name: "Company LinkedIn",
    handle: "Company Name",
    followers: 8920,
    followersChange: 2.1,
    engagement: 3.5,
    engagementChange: 0.8,
    connected: true,
    lastUpdated: "45 minutes ago",
  },
  {
    id: "yt1",
    platform: "youtube",
    name: "Company YouTube",
    handle: "Company Name",
    followers: 5280,
    followersChange: 1.5,
    engagement: 6.7,
    engagementChange: 2.1,
    connected: true,
    lastUpdated: "2 hours ago",
  },
];

const samplePosts: SocialPost[] = [
  {
    id: "p1",
    platform: "twitter",
    content:
      "Excited to announce our new product launch! Check it out at our website. #NewProduct #Innovation",
    date: "2 hours ago",
    likes: 145,
    comments: 32,
    shares: 78,
    views: 2450,
    engagement: 10.4,
  },
  {
    id: "p2",
    platform: "instagram",
    content:
      "Behind the scenes at our latest photoshoot. Can't wait to share the results! #BTS #ComingSoon",
    date: "1 day ago",
    likes: 892,
    comments: 56,
    shares: 24,
    views: 5670,
    engagement: 17.2,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
  {
    id: "p3",
    platform: "facebook",
    content:
      "We're hiring! Join our team of passionate professionals. Click the link in bio to apply.",
    date: "3 days ago",
    likes: 210,
    comments: 45,
    shares: 112,
    views: 3890,
    engagement: 9.5,
  },
  {
    id: "p4",
    platform: "linkedin",
    content:
      "Our CEO will be speaking at the upcoming industry conference. Register now to secure your spot!",
    date: "5 days ago",
    likes: 324,
    comments: 28,
    shares: 87,
    views: 2780,
    engagement: 15.8,
  },
  {
    id: "p5",
    platform: "youtube",
    content:
      "New tutorial: How to get the most out of our platform in 10 minutes",
    date: "1 week ago",
    likes: 567,
    comments: 89,
    shares: 134,
    views: 12450,
    engagement: 6.3,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
  },
];

const audienceData: AudienceData = {
  platform: "all",
  ageGroups: [
    { label: "18-24", value: 22 },
    { label: "25-34", value: 38 },
    { label: "35-44", value: 25 },
    { label: "45-54", value: 10 },
    { label: "55+", value: 5 },
  ],
  genderSplit: [
    { label: "Male", value: 48 },
    { label: "Female", value: 51 },
    { label: "Other", value: 1 },
  ],
  topLocations: [
    { location: "United States", value: 45 },
    { location: "United Kingdom", value: 15 },
    { location: "Canada", value: 12 },
    { location: "Australia", value: 8 },
    { location: "Germany", value: 5 },
  ],
  activeHours: [
    { hour: "6am", value: 5 },
    { hour: "9am", value: 15 },
    { hour: "12pm", value: 22 },
    { hour: "3pm", value: 28 },
    { hour: "6pm", value: 35 },
    { hour: "9pm", value: 25 },
    { hour: "12am", value: 12 },
    { hour: "3am", value: 3 },
  ],
};

function getPlatformIcon(platform: string, size = 20) {
  switch (platform) {
    case "twitter":
      return <Twitter size={size} className="text-blue-400" />;
    case "instagram":
      return <Instagram size={size} className="text-pink-500" />;
    case "facebook":
      return <Facebook size={size} className="text-blue-600" />;
    case "linkedin":
      return <Linkedin size={size} className="text-blue-700" />;
    case "youtube":
      return <Youtube size={size} className="text-red-600" />;
    default:
      return <Globe size={size} />;
  }
}

function getChangeIndicator(value: number) {
  if (value > 0) {
    return <ArrowUpRight className="h-4 w-4 text-emerald-500" />;
  } else if (value < 0) {
    return <ArrowDownRight className="h-4 w-4 text-rose-500" />;
  }
  return null;
}

export default function SocialMedia() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");

  const totalFollowers = sampleAccounts.reduce(
    (sum, account) => sum + account.followers,
    0,
  );

  const avgEngagement =
    sampleAccounts.reduce((sum, account) => sum + account.engagement, 0) /
    sampleAccounts.length;

  const totalInteractions = samplePosts.reduce(
    (sum, post) => sum + post.likes + post.comments + post.shares,
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Social Media
        </h2>
        <p className="text-white">
          Monitor and manage your social media presence across platforms.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Followers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {totalFollowers.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-white">
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+2.5%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Avg. Engagement Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {avgEngagement.toFixed(1)}%
            </div>
            <div className="flex items-center text-xs text-white">
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+0.8%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {totalInteractions.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-white">
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+12.3%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Connected Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {sampleAccounts.length}
            </div>
            <div className="flex mt-1 gap-1">
              {sampleAccounts.map((account) => (
                <div key={account.id}>
                  {getPlatformIcon(account.platform, 16)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-4 bg-[#2a2a3a]">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="accounts"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Accounts
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Content
          </TabsTrigger>
          <TabsTrigger
            value="audience"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Audience
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Platform Performance */}
            <Card className="bg-[#1e1e2d] border-[#2a2a3a] lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">
                  Platform Performance
                </CardTitle>
                <CardDescription className="text-white">
                  Follower growth and engagement across platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleAccounts.map((account) => (
                    <div key={account.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getPlatformIcon(account.platform)}
                          <span className="ml-2 text-white font-medium">
                            {account.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">
                            {account.followers.toLocaleString()} followers
                          </div>
                          <div className="flex items-center justify-end text-xs">
                            {getChangeIndicator(account.followersChange)}
                            <span
                              className={`${account.followersChange > 0 ? "text-emerald-500" : account.followersChange < 0 ? "text-rose-500" : "text-gray-400"}`}
                            >
                              {account.followersChange > 0 ? "+" : ""}
                              {account.followersChange}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={account.engagement * 10}
                          className="h-1 flex-1 bg-[#2a2a3a]"
                        />
                        <span className="text-xs text-white">
                          {account.engagement}% engagement
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-white">
                  Latest interactions across platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      {getPlatformIcon("instagram", 16)}
                      <div>
                        <p className="text-sm text-white">
                          <span className="font-medium">@user123</span>{" "}
                          commented on your post
                        </p>
                        <p className="text-xs text-gray-400">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      {getPlatformIcon("twitter", 16)}
                      <div>
                        <p className="text-sm text-white">
                          <span className="font-medium">@techfan</span>{" "}
                          retweeted your announcement
                        </p>
                        <p className="text-xs text-gray-400">45 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      {getPlatformIcon("facebook", 16)}
                      <div>
                        <p className="text-sm text-white">
                          <span className="font-medium">Jane Smith</span> liked
                          your page
                        </p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      {getPlatformIcon("linkedin", 16)}
                      <div>
                        <p className="text-sm text-white">
                          <span className="font-medium">John Doe</span> shared
                          your article
                        </p>
                        <p className="text-xs text-gray-400">3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      {getPlatformIcon("youtube", 16)}
                      <div>
                        <p className="text-sm text-white">
                          <span className="font-medium">TechReviewer</span>
                          subscribed to your channel
                        </p>
                        <p className="text-xs text-gray-400">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#2a2a3a] pt-4">
                <Button
                  variant="outline"
                  className="w-full border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                >
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Best Performing Content */}
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">
                Best Performing Content
              </CardTitle>
              <CardDescription className="text-white">
                Posts with the highest engagement rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {samplePosts
                  .sort((a, b) => b.engagement - a.engagement)
                  .slice(0, 3)
                  .map((post) => (
                    <div
                      key={post.id}
                      className="bg-[#2a2a3a] rounded-lg overflow-hidden border border-[#3a3a4a]"
                    >
                      {post.image && (
                        <div className="h-40 overflow-hidden">
                          <img
                            src={post.image}
                            alt="Post"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {getPlatformIcon(post.platform, 16)}
                            <span className="ml-1 text-xs text-gray-300">
                              {post.date}
                            </span>
                          </div>
                          <Badge className="bg-[#7b68ee] text-white">
                            {post.engagement}% Engagement
                          </Badge>
                        </div>
                        <p className="text-sm text-white mb-3 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex justify-between text-xs text-gray-300">
                          <div className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {post.likes}
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {post.comments}
                          </div>
                          <div className="flex items-center">
                            <Share2 className="h-3 w-3 mr-1" />
                            {post.shares}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {post.views}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#2a2a3a] pt-4">
              <Button
                variant="outline"
                className="w-full border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
              >
                View All Content
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-4 pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">
                    Connected Accounts
                  </CardTitle>
                  <CardDescription className="text-white">
                    Manage your social media accounts
                  </CardDescription>
                </div>
                <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                  Connect New Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="bg-[#2a2a3a] rounded-lg p-4 border border-[#3a3a4a]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-[#3a3a4a] mr-3">
                          {getPlatformIcon(account.platform)}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">
                            {account.name}
                          </h4>
                          <p className="text-sm text-gray-300">
                            {account.handle}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#3a3a4a] bg-[#3a3a4a] text-white hover:bg-[#454555]"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" /> Refresh
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#3a3a4a] bg-[#3a3a4a] text-white hover:bg-[#454555]"
                        >
                          Settings
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="bg-[#3a3a4a] p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">
                            Followers
                          </span>
                          <div className="flex items-center">
                            {getChangeIndicator(account.followersChange)}
                            <span
                              className={`text-xs ${account.followersChange > 0 ? "text-emerald-500" : account.followersChange < 0 ? "text-rose-500" : "text-gray-400"}`}
                            >
                              {account.followersChange > 0 ? "+" : ""}
                              {account.followersChange}%
                            </span>
                          </div>
                        </div>
                        <p className="text-lg font-semibold text-white mt-1">
                          {account.followers.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-[#3a3a4a] p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">
                            Engagement
                          </span>
                          <div className="flex items-center">
                            {getChangeIndicator(account.engagementChange)}
                            <span
                              className={`text-xs ${account.engagementChange > 0 ? "text-emerald-500" : account.engagementChange < 0 ? "text-rose-500" : "text-gray-400"}`}
                            >
                              {account.engagementChange > 0 ? "+" : ""}
                              {account.engagementChange}%
                            </span>
                          </div>
                        </div>
                        <p className="text-lg font-semibold text-white mt-1">
                          {account.engagement}%
                        </p>
                      </div>
                      <div className="bg-[#3a3a4a] p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">
                            Last Updated
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-white mt-1">
                          {account.lastUpdated}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4 pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">
                    Content Performance
                  </CardTitle>
                  <CardDescription className="text-white">
                    Track engagement across your social media posts
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <select
                    className="bg-[#2a2a3a] border-[#3a3a4a] text-white rounded-md px-3 py-1 text-sm"
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                  >
                    <option value="all">All Platforms</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                  </select>
                  <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                    Create Post
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {samplePosts
                  .filter(
                    (post) =>
                      selectedPlatform === "all" ||
                      post.platform === selectedPlatform,
                  )
                  .map((post) => (
                    <div
                      key={post.id}
                      className="bg-[#2a2a3a] rounded-lg p-4 border border-[#3a3a4a]"
                    >
                      <div className="flex items-start gap-4">
                        {post.image && (
                          <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={post.image}
                              alt="Post"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(post.platform)}
                              <span className="text-white font-medium">
                                {post.platform.charAt(0).toUpperCase() +
                                  post.platform.slice(1)}
                              </span>
                              <span className="text-xs text-gray-300">
                                {post.date}
                              </span>
                            </div>
                            <Badge className="bg-[#7b68ee] text-white">
                              {post.engagement}% Engagement
                            </Badge>
                          </div>
                          <p className="text-sm text-white mb-3">
                            {post.content}
                          </p>
                          <div className="flex gap-6 text-sm text-gray-300">
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center">
                              <Share2 className="h-4 w-4 mr-1" />
                              <span>{post.shares}</span>
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#2a2a3a] pt-4">
              <Button
                variant="outline"
                className="w-full border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
              >
                Load More Posts
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Demographics */}
            <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Demographics</CardTitle>
                    <CardDescription className="text-white">
                      Age and gender distribution of your audience
                    </CardDescription>
                  </div>
                  <select
                    className="bg-[#2a2a3a] border-[#3a3a4a] text-white rounded-md px-3 py-1 text-sm"
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                  >
                    <option value="all">All Platforms</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">
                      Age Groups
                    </h4>
                    <div className="space-y-2">
                      {audienceData.ageGroups.map((group) => (
                        <div key={group.label} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white">{group.label}</span>
                            <span className="text-white">{group.value}%</span>
                          </div>
                          <Progress
                            value={group.value}
                            className="h-1 bg-[#2a2a3a]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">
                      Gender
                    </h4>
                    <div className="flex gap-2">
                      {audienceData.genderSplit.map((gender) => (
                        <div
                          key={gender.label}
                          className="flex-1 bg-[#2a2a3a] p-3 rounded-md text-center"
                        >
                          <div className="text-lg font-bold text-white">
                            {gender.value}%
                          </div>
                          <div className="text-sm text-gray-300">
                            {gender.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Locations */}
            <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
              <CardHeader>
                <CardTitle className="text-white">Top Locations</CardTitle>
                <CardDescription className="text-white">
                  Geographic distribution of your audience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {audienceData.topLocations.map((location) => (
                    <div key={location.location} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-white">
                            {location.location}
                          </span>
                        </div>
                        <span className="text-white">{location.value}%</span>
                      </div>
                      <Progress
                        value={location.value}
                        className="h-1 bg-[#2a2a3a]"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-white mb-3">
                    Active Hours (UTC)
                  </h4>
                  <div className="h-[150px] flex items-end justify-between gap-1">
                    {audienceData.activeHours.map((hour) => (
                      <div
                        key={hour.hour}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="w-full bg-[#7b68ee] rounded-t-sm"
                          style={{ height: `${hour.value * 3}px` }}
                        />
                        <span className="mt-2 text-xs text-gray-300">
                          {hour.hour}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audience Insights */}
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Audience Insights</CardTitle>
              <CardDescription className="text-white">
                Key metrics and trends about your followers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-[#2a2a3a] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">
                      Growth Rate
                    </h4>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  </div>
                  <p className="text-2xl font-bold text-white">+3.2%</p>
                  <p className="text-xs text-gray-300 mt-1">
                    vs. 2.8% last month
                  </p>
                </div>

                <div className="bg-[#2a2a3a] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">Reach</h4>
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-white">124.5K</p>
                  <p className="text-xs text-gray-300 mt-1">
                    +15.3% from last month
                  </p>
                </div>

                <div className="bg-[#2a2a3a] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">
                      Impressions
                    </h4>
                    <Eye className="h-4 w-4 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-white">345.8K</p>
                  <p className="text-xs text-gray-300 mt-1">
                    +22.7% from last month
                  </p>
                </div>

                <div className="bg-[#2a2a3a] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">
                      Avg. Time
                    </h4>
                    <Clock className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="text-2xl font-bold text-white">2:45</p>
                  <p className="text-xs text-gray-300 mt-1">
                    +0:35 from last month
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="bg-[#2a2a3a] p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-3">
                    Audience Interests
                  </h4>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">Technology</span>
                        <span className="text-white">68%</span>
                      </div>
                      <Progress value={68} className="h-1 bg-[#3a3a4a]" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">Business</span>
                        <span className="text-white">52%</span>
                      </div>
                      <Progress value={52} className="h-1 bg-[#3a3a4a]" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">Marketing</span>
                        <span className="text-white">45%</span>
                      </div>
                      <Progress value={45} className="h-1 bg-[#3a3a4a]" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">Design</span>
                        <span className="text-white">37%</span>
                      </div>
                      <Progress value={37} className="h-1 bg-[#3a3a4a]" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">Finance</span>
                        <span className="text-white">24%</span>
                      </div>
                      <Progress value={24} className="h-1 bg-[#3a3a4a]" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#2a2a3a] p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-3">
                    Devices & Platforms
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs text-gray-300 mb-2">Devices</h5>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white">Mobile</span>
                            <span className="text-white">72%</span>
                          </div>
                          <Progress value={72} className="h-1 bg-[#3a3a4a]" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white">Desktop</span>
                            <span className="text-white">23%</span>
                          </div>
                          <Progress value={23} className="h-1 bg-[#3a3a4a]" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white">Tablet</span>
                            <span className="text-white">5%</span>
                          </div>
                          <Progress value={5} className="h-1 bg-[#3a3a4a]" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs text-gray-300 mb-2">Browsers</h5>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white">Chrome</span>
                            <span className="text-white">64%</span>
                          </div>
                          <Progress value={64} className="h-1 bg-[#3a3a4a]" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white">Safari</span>
                            <span className="text-white">22%</span>
                          </div>
                          <Progress value={22} className="h-1 bg-[#3a3a4a]" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white">Firefox</span>
                            <span className="text-white">8%</span>
                          </div>
                          <Progress value={8} className="h-1 bg-[#3a3a4a]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#2a2a3a] pt-4">
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-white">
                  <span className="font-medium">Data Source:</span> Platform
                  APIs
                </div>
                <Button
                  variant="outline"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                >
                  <BarChart3 className="mr-2 h-4 w-4" /> Export Report
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
