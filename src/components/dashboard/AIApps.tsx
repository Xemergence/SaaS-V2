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
import { Input } from "@/UIComponents";
import { Label } from "@/UIComponents";
import { Separator } from "@/UIComponents";
import { Badge } from "@/UIComponents";
import { Progress } from "@/UIComponents";
import {
  ReceiptText,
  Package,
  Upload,
  Plus,
  Camera,
  Trash2,
  ExternalLink,
  Mail,
  AppWindow,
  Bell,
  Calendar,
  MessageSquare,
  Users,
  BarChart,
  Clock,
  Send,
} from "lucide-react";
import { useState } from "react";

// Types and sample data for Message Reminders
interface Campaign {
  id: string;
  name: string;
  type: "SMS" | "Email" | "SMS & Email";
  status: "Active" | "Scheduled" | "Draft" | "Paused" | "Completed";
  audience: string;
  nextSend: string;
  openRate: number;
  recurring: boolean;
}

interface MessageTemplate {
  name: string;
  type: "sms" | "email";
  content: string;
}

// Types and sample data for Tax Capture
interface Receipt {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  category: string;
  status: string;
  notes?: string;
  imageUrl?: string;
}

// Types and sample data for Package Tracking
interface Package {
  id: string;
  trackingNumber: string;
  carrier: string;
  status: string;
  description?: string;
  timeline: string[];
  currentStep: number;
  latestUpdate: string;
  estimatedDelivery?: string;
}

const sampleTemplates: MessageTemplate[] = [
  {
    name: "Welcome Message",
    type: "sms",
    content:
      "Hi {name}, welcome to our platform! Let us know if you need any help getting started.",
  },
  {
    name: "Weekly Newsletter",
    type: "email",
    content:
      "Hello {name}, here's your weekly update on what's new with our platform.",
  },
  {
    name: "Appointment Reminder",
    type: "sms",
    content:
      "Reminder: You have an appointment scheduled for tomorrow at 2:00 PM.",
  },
  {
    name: "Re-engagement Email",
    type: "email",
    content:
      "Hi {name}, we noticed you haven't logged in since {last_login}. Here's what you've been missing...",
  },
  {
    name: "Feedback Request",
    type: "sms",
    content:
      "Hi {name}, we'd love to hear your feedback! Reply with a rating from 1-10 on your experience with us.",
  },
];

const sampleCampaigns: Campaign[] = [
  {
    id: "c1",
    name: "Welcome Series",
    type: "SMS & Email",
    status: "Active",
    audience: "New Users",
    nextSend: "Daily at 9:00 AM",
    openRate: 68,
    recurring: true,
  },
  {
    id: "c2",
    name: "Re-engagement Campaign",
    type: "Email",
    status: "Active",
    audience: "Inactive Users",
    nextSend: "May 25, 2023 at 10:00 AM",
    openRate: 42,
    recurring: false,
  },
  {
    id: "c3",
    name: "Product Update Announcement",
    type: "SMS",
    status: "Scheduled",
    audience: "All Users",
    nextSend: "May 30, 2023 at 2:00 PM",
    openRate: 0,
    recurring: false,
  },
  {
    id: "c4",
    name: "Weekly Newsletter",
    type: "Email",
    status: "Active",
    audience: "Subscribed Users",
    nextSend: "Every Friday at 11:00 AM",
    openRate: 53,
    recurring: true,
  },
  {
    id: "c5",
    name: "Feedback Request",
    type: "SMS",
    status: "Paused",
    audience: "Active Users",
    nextSend: "Paused",
    openRate: 37,
    recurring: false,
  },
];

const sampleReceipts: Receipt[] = [
  {
    id: "r1",
    vendor: "Office Supplies Co.",
    amount: 127.53,
    date: "May 15, 2023",
    category: "Business Expense",
    status: "Processed",
    notes: "Quarterly office supply restock",
  },
  {
    id: "r2",
    vendor: "Downtown Cafe",
    amount: 42.75,
    date: "May 12, 2023",
    category: "Meals & Entertainment",
    status: "Processed",
  },
  {
    id: "r3",
    vendor: "Rideshare Inc.",
    amount: 24.99,
    date: "May 10, 2023",
    category: "Transportation",
    status: "Pending Review",
    notes: "Client meeting transportation",
  },
  {
    id: "r4",
    vendor: "Hotel Continental",
    amount: 349.99,
    date: "May 5, 2023",
    category: "Lodging",
    status: "Processed",
  },
  {
    id: "r5",
    vendor: "Cloud Services Ltd.",
    amount: 199.99,
    date: "May 1, 2023",
    category: "Software Subscription",
    status: "Processed",
    notes: "Monthly cloud infrastructure payment",
  },
];

const samplePackages: Package[] = [
  {
    id: "p1",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    status: "In Transit",
    description: "New laptop",
    timeline: [
      "Order Placed",
      "Shipped",
      "In Transit",
      "Out for Delivery",
      "Delivered",
    ],
    currentStep: 2,
    latestUpdate: "Package departed UPS facility in Atlanta, GA",
    estimatedDelivery: "May 18, 2023",
  },
  {
    id: "p2",
    trackingNumber: "9400111202555842349010",
    carrier: "USPS",
    status: "Out for Delivery",
    description: "Books from Amazon",
    timeline: [
      "Order Placed",
      "Shipped",
      "In Transit",
      "Out for Delivery",
      "Delivered",
    ],
    currentStep: 3,
    latestUpdate: "Out for delivery in your area",
    estimatedDelivery: "Today by 8:00 PM",
  },
  {
    id: "p3",
    trackingNumber: "794677302010",
    carrier: "FedEx",
    status: "Delivered",
    timeline: [
      "Order Placed",
      "Shipped",
      "In Transit",
      "Out for Delivery",
      "Delivered",
    ],
    currentStep: 4,
    latestUpdate: "Package delivered, signed for by JSMITH",
  },
  {
    id: "p4",
    trackingNumber: "TBA005338499123",
    carrier: "Amazon",
    status: "Shipped",
    description: "Kitchen supplies",
    timeline: [
      "Order Placed",
      "Shipped",
      "In Transit",
      "Out for Delivery",
      "Delivered",
    ],
    currentStep: 1,
    latestUpdate: "Package has left the seller facility",
    estimatedDelivery: "May 20, 2023",
  },
];

// Helper function for package status colors
function getStatusColor(status: string): string {
  switch (status) {
    case "Delivered":
      return "bg-emerald-500";
    case "Out for Delivery":
      return "bg-blue-500";
    case "In Transit":
      return "bg-amber-500";
    case "Shipped":
      return "bg-purple-500";
    case "Order Placed":
      return "bg-slate-500";
    default:
      return "bg-slate-500";
  }
}

// Helper function for campaign status colors
function getCampaignStatusColor(status: string): string {
  switch (status) {
    case "Active":
      return "bg-emerald-500 text-white";
    case "Scheduled":
      return "bg-blue-500 text-white";
    case "Draft":
      return "bg-slate-500 text-white";
    case "Paused":
      return "bg-amber-500 text-white";
    case "Completed":
      return "bg-purple-500 text-white";
    default:
      return "bg-slate-500 text-white";
  }
}

export default function AIApps() {
  const [activeTab, setActiveTab] = useState("tax-capture");
  const [receipts, setReceipts] = useState<Receipt[]>(sampleReceipts);
  const [packages, setPackages] = useState<Package[]>(samplePackages);
  const [newTrackingNumber, setNewTrackingNumber] = useState("");
  const [newCarrier, setNewCarrier] = useState("USPS");
  const [activeCampaigns, setActiveCampaigns] =
    useState<Campaign[]>(sampleCampaigns);
  const [messageTemplates, setMessageTemplates] =
    useState<MessageTemplate[]>(sampleTemplates);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          AI Apps
        </h2>
        <p className="text-white">
          Specialized AI applications to streamline your business operations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="bg-[#1e1e2d] border-[#2a2a3a] hover:border-[#7b68ee] transition-colors cursor-pointer"
          onClick={() => setActiveTab("tax-capture")}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-[#2a2a3a]">
                <ReceiptText className="h-5 w-5 text-[#7b68ee]" />
              </div>
              <CardTitle className="text-white">Tax Capture</CardTitle>
            </div>
            <CardDescription className="text-gray-300">
              Automatically process receipts and track expenses for tax purposes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-white">
              <p>• Upload receipts and photos</p>
              <p>• AI-powered data extraction</p>
              <p>• Categorize expenses automatically</p>
              <p>• Export for tax filing</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#2a2a3a] hover:bg-[#353545] text-white">
              Open Tax Capture
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="bg-[#1e1e2d] border-[#2a2a3a] hover:border-[#7b68ee] transition-colors cursor-pointer"
          onClick={() => setActiveTab("package-tracking")}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-[#2a2a3a]">
                <Package className="h-5 w-5 text-[#7b68ee]" />
              </div>
              <CardTitle className="text-white">Package Tracking</CardTitle>
            </div>
            <CardDescription className="text-gray-300">
              Track shipments across carriers with email integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-white">
              <p>• Automatic email scanning</p>
              <p>• Multi-carrier support</p>
              <p>• Delivery notifications</p>
              <p>• Package history</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#2a2a3a] hover:bg-[#353545] text-white">
              Open Package Tracking
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="bg-[#1e1e2d] border-[#2a2a3a] hover:border-[#7b68ee] transition-colors cursor-pointer"
          onClick={() => setActiveTab("message-reminders")}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-[#2a2a3a]">
                <Bell className="h-5 w-5 text-[#7b68ee]" />
              </div>
              <CardTitle className="text-white">Message Reminders</CardTitle>
            </div>
            <CardDescription className="text-gray-300">
              Send automated SMS and email reminders to your users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-white">
              <p>• Schedule automated messages</p>
              <p>• SMS and email support</p>
              <p>• Custom message templates</p>
              <p>• User engagement analytics</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#2a2a3a] hover:bg-[#353545] text-white">
              Open Message Reminders
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-[#1e1e2d] border-[#2a2a3a] opacity-60">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-[#2a2a3a]">
                <AppWindow className="h-5 w-5 text-[#7b68ee]" />
              </div>
              <CardTitle className="text-white">Coming Soon</CardTitle>
            </div>
            <CardDescription className="text-gray-300">
              More AI apps are in development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-white">
              <p>• Document processing</p>
              <p>• Customer support automation</p>
              <p>• Sales forecasting</p>
              <p>• And more...</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#2a2a3a] hover:bg-[#353545] text-white"
              disabled
            >
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-[#2a2a3a]">
          <TabsTrigger
            value="tax-capture"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Tax Capture
          </TabsTrigger>
          <TabsTrigger
            value="package-tracking"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Package Tracking
          </TabsTrigger>
          <TabsTrigger
            value="message-reminders"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Message Reminders
          </TabsTrigger>
        </TabsList>

        {/* Tax Capture Tab */}
        <TabsContent value="tax-capture" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Tax Receipt Capture</CardTitle>
              <CardDescription className="text-white">
                Upload receipts and photos for tax tracking and expense
                management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Upload Section */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Upload New Receipt
                    </h3>
                    <div className="border-2 border-dashed border-[#2a2a3a] rounded-lg p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-white mb-2" />
                      <p className="text-sm text-white mb-2">
                        Drag and drop files here or click to browse
                      </p>
                      <p className="text-xs text-gray-300 mb-4">
                        Supports JPG, PNG, PDF up to 10MB
                      </p>
                      <div className="flex gap-2">
                        <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                          <Upload className="mr-2 h-4 w-4" /> Upload Files
                        </Button>
                        <Button
                          variant="outline"
                          className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                        >
                          <Camera className="mr-2 h-4 w-4" /> Take Photo
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Add Receipt Manually
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="vendor" className="text-white">
                            Vendor
                          </Label>
                          <Input
                            id="vendor"
                            placeholder="Store or vendor name"
                            className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount" className="text-white">
                            Amount
                          </Label>
                          <Input
                            id="amount"
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date" className="text-white">
                            Date
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-white">
                            Category
                          </Label>
                          <Input
                            id="category"
                            placeholder="Business, Personal, etc."
                            className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-white">
                          Notes
                        </Label>
                        <Input
                          id="notes"
                          placeholder="Additional details"
                          className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                        />
                      </div>
                      <Button className="w-full bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                        <Plus className="mr-2 h-4 w-4" /> Add Receipt
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Receipts List */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Recent Receipts
                  </h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {receipts.map((receipt) => (
                      <div
                        key={receipt.id}
                        className="bg-[#2a2a3a] rounded-lg p-4 border border-[#3a3a4a]"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-white">
                              {receipt.vendor}
                            </h4>
                            <p className="text-sm text-gray-300">
                              {receipt.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-white">
                              ${receipt.amount.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-300">
                              {receipt.category}
                            </p>
                          </div>
                        </div>
                        {receipt.notes && (
                          <p className="text-sm text-gray-300 mt-2">
                            {receipt.notes}
                          </p>
                        )}
                        <div className="flex justify-between items-center mt-3">
                          <Badge className="bg-[#7b68ee] text-white">
                            {receipt.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-white hover:bg-[#3a3a4a]"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-white hover:bg-[#3a3a4a]"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#2a2a3a] mt-4 pt-4">
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-white">
                  <span className="font-medium">Total Receipts:</span>{" "}
                  {receipts.length}
                </div>
                <Button
                  variant="outline"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                >
                  Export All Receipts
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Package Tracking Tab */}
        <TabsContent value="package-tracking" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Package Tracking</CardTitle>
              <CardDescription className="text-white">
                Track your packages from USPS, UPS, FedEx and other carriers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Add Tracking Section */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Add Package Tracking
                  </h3>
                  <div className="space-y-4 bg-[#2a2a3a] rounded-lg p-4 border border-[#3a3a4a]">
                    <div className="space-y-2">
                      <Label htmlFor="tracking-number" className="text-white">
                        Tracking Number
                      </Label>
                      <Input
                        id="tracking-number"
                        placeholder="Enter tracking number"
                        className="bg-[#3a3a4a] border-[#4a4a5a] text-white"
                        value={newTrackingNumber}
                        onChange={(e) => setNewTrackingNumber(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carrier" className="text-white">
                        Carrier
                      </Label>
                      <select
                        id="carrier"
                        className="w-full bg-[#3a3a4a] border-[#4a4a5a] text-white rounded-md px-3 py-2"
                        value={newCarrier}
                        onChange={(e) => setNewCarrier(e.target.value)}
                      >
                        <option value="USPS">USPS</option>
                        <option value="UPS">UPS</option>
                        <option value="FedEx">FedEx</option>
                        <option value="DHL">DHL</option>
                        <option value="Amazon">Amazon Logistics</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="package-description"
                        className="text-white"
                      >
                        Description (Optional)
                      </Label>
                      <Input
                        id="package-description"
                        placeholder="What's in this package?"
                        className="bg-[#3a3a4a] border-[#4a4a5a] text-white"
                      />
                    </div>
                    <Button className="w-full bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                      <Plus className="mr-2 h-4 w-4" /> Add Package
                    </Button>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Email Scanning
                    </h3>
                    <div className="bg-[#2a2a3a] rounded-lg p-4 border border-[#3a3a4a]">
                      <p className="text-sm text-white mb-4">
                        Connect your email to automatically detect and track
                        packages from shipping notifications.
                      </p>
                      <div className="flex gap-2">
                        <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                          <Mail className="mr-2 h-4 w-4" /> Connect Email
                        </Button>
                        <Button
                          variant="outline"
                          className="border-[#3a3a4a] bg-[#3a3a4a] text-white hover:bg-[#454555]"
                        >
                          Scan Now
                        </Button>
                      </div>
                      <p className="text-xs text-gray-300 mt-4">
                        Last scan: Today at 9:45 AM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Packages List */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Your Packages
                  </h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="bg-[#2a2a3a] rounded-lg p-4 border border-[#3a3a4a]"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-white">
                                {pkg.description ||
                                  `Package from ${pkg.carrier}`}
                              </h4>
                              <Badge
                                className={`${getStatusColor(pkg.status)} text-white`}
                              >
                                {pkg.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                              {pkg.carrier} • {pkg.trackingNumber}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-white hover:bg-[#3a3a4a]"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mt-4">
                          <div className="relative">
                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#3a3a4a] -translate-y-1/2"></div>
                            <div className="relative flex justify-between">
                              {pkg.timeline.map((event, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col items-center"
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full z-10 ${index <= pkg.currentStep ? "bg-[#7b68ee]" : "bg-[#3a3a4a]"}`}
                                  ></div>
                                  <p className="text-xs text-white mt-2 text-center max-w-[80px]">
                                    {event}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-sm">
                          <p className="text-white">
                            <span className="text-gray-300">
                              Latest update:
                            </span>{" "}
                            {pkg.latestUpdate}
                          </p>
                          {pkg.estimatedDelivery && (
                            <p className="text-white mt-1">
                              <span className="text-gray-300">
                                Estimated delivery:
                              </span>{" "}
                              {pkg.estimatedDelivery}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#2a2a3a] mt-4 pt-4">
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-white">
                  <span className="font-medium">Active Packages:</span>{" "}
                  {packages.filter((p) => p.status !== "Delivered").length} of{" "}
                  {packages.length}
                </div>
                <Button
                  variant="outline"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                >
                  View Delivery History
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Message Reminders Tab */}
        <TabsContent value="message-reminders" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Message Reminders</CardTitle>
              <CardDescription className="text-white">
                Schedule and send automated SMS and email reminders to your
                users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Create Campaign Section */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Create New Campaign
                    </h3>
                    <div className="space-y-4 bg-[#2a2a3a] rounded-lg p-4 border border-[#3a3a4a]">
                      <div className="space-y-2">
                        <Label htmlFor="campaign-name" className="text-white">
                          Campaign Name
                        </Label>
                        <Input
                          id="campaign-name"
                          placeholder="Enter campaign name"
                          className="bg-[#3a3a4a] border-[#4a4a5a] text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message-type" className="text-white">
                          Message Type
                        </Label>
                        <select
                          id="message-type"
                          className="w-full bg-[#3a3a4a] border-[#4a4a5a] text-white rounded-md px-3 py-2"
                        >
                          <option value="sms">SMS</option>
                          <option value="email">Email</option>
                          <option value="both">Both SMS & Email</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="audience" className="text-white">
                          Target Audience
                        </Label>
                        <select
                          id="audience"
                          className="w-full bg-[#3a3a4a] border-[#4a4a5a] text-white rounded-md px-3 py-2"
                        >
                          <option value="all">All Users</option>
                          <option value="active">Active Users</option>
                          <option value="inactive">
                            Inactive Users (30+ days)
                          </option>
                          <option value="new">
                            New Users (less than 7 days)
                          </option>
                          <option value="custom">Custom Segment</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="message-template"
                          className="text-white"
                        >
                          Message Template
                        </Label>
                        <textarea
                          id="message-template"
                          rows={4}
                          placeholder="Enter your message. Use {name} for personalization."
                          className="w-full bg-[#3a3a4a] border-[#4a4a5a] text-white rounded-md px-3 py-2"
                        ></textarea>
                        <p className="text-xs text-gray-300">
                          Available variables: {"{name}"}, {"{email}"},{" "}
                          {"{last_login}"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="schedule-type" className="text-white">
                          Schedule Type
                        </Label>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="one-time"
                              name="schedule-type"
                              className="text-[#7b68ee]"
                            />
                            <Label
                              htmlFor="one-time"
                              className="text-white text-sm"
                            >
                              One-time
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="recurring"
                              name="schedule-type"
                              className="text-[#7b68ee]"
                            />
                            <Label
                              htmlFor="recurring"
                              className="text-white text-sm"
                            >
                              Recurring
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="send-date" className="text-white">
                            Send Date
                          </Label>
                          <Input
                            id="send-date"
                            type="date"
                            className="bg-[#3a3a4a] border-[#4a4a5a] text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="send-time" className="text-white">
                            Send Time
                          </Label>
                          <Input
                            id="send-time"
                            type="time"
                            className="bg-[#3a3a4a] border-[#4a4a5a] text-white"
                          />
                        </div>
                      </div>
                      <Button className="w-full bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                        <Send className="mr-2 h-4 w-4" /> Create Campaign
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Active Campaigns */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Active Campaigns
                  </h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {activeCampaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="bg-[#2a2a3a] rounded-lg p-4 border border-[#3a3a4a]"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-white">
                                {campaign.name}
                              </h4>
                              <Badge
                                className={getCampaignStatusColor(
                                  campaign.status,
                                )}
                              >
                                {campaign.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className="text-white border-[#3a3a4a] bg-[#3a3a4a]"
                              >
                                {campaign.type}
                              </Badge>
                              {campaign.recurring && (
                                <Badge
                                  variant="outline"
                                  className="text-white border-[#3a3a4a] bg-[#3a3a4a]"
                                >
                                  Recurring
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-white hover:bg-[#3a3a4a]"
                            >
                              <BarChart className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-white hover:bg-[#3a3a4a]"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Users className="h-3.5 w-3.5" />
                            <span>{campaign.audience}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300 mt-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{campaign.nextSend}</span>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white">Performance</span>
                            <span className="text-white">
                              {campaign.openRate}% open rate
                            </span>
                          </div>
                          <Progress
                            value={campaign.openRate}
                            className="h-1 mt-1 bg-[#3a3a4a]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Message Templates
                    </h3>
                    <div className="bg-[#2a2a3a] rounded-lg p-4 border border-[#3a3a4a]">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-white font-medium">
                          Saved Templates
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#3a3a4a] bg-[#3a3a4a] text-white hover:bg-[#454555]"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" /> New Template
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {messageTemplates.map((template, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 hover:bg-[#3a3a4a] rounded-md cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              {template.type === "sms" ? (
                                <MessageSquare className="h-4 w-4 text-blue-400" />
                              ) : (
                                <Mail className="h-4 w-4 text-purple-400" />
                              )}
                              <span className="text-white text-sm">
                                {template.name}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-white hover:bg-[#454555]"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#2a2a3a] mt-4 pt-4">
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-white">
                  <span className="font-medium">Active Campaigns:</span>{" "}
                  {activeCampaigns.filter((c) => c.status === "Active").length}{" "}
                  of {activeCampaigns.length}
                </div>
                <Button
                  variant="outline"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                >
                  <BarChart className="mr-2 h-4 w-4" /> View Analytics
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
