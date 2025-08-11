import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/UIComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/UIComponents";
import { Progress } from "@/UIComponents";
import { Button } from "@/UIComponents";
import { Input } from "@/UIComponents";
import { Label } from "@/UIComponents";
import { Separator } from "@/UIComponents";
import {
  BrainCircuit,
  Cpu,
  MessageSquare,
  Image,
  FileText,
  ReceiptText,
  Package,
  Upload,
  Plus,
  Calendar,
  Truck,
  Mail,
  Camera,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

export default function AITools() {
  const [activeTab, setActiveTab] = useState("usage");
  const [receipts, setReceipts] = useState<Receipt[]>(sampleReceipts);
  const [packages, setPackages] = useState<Package[]>(samplePackages);
  const [newTrackingNumber, setNewTrackingNumber] = useState("");
  const [newCarrier, setNewCarrier] = useState("USPS");
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          AI Tools
        </h2>
        <p className="text-white">
          Monitor and manage your AI usage and performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total AI Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$1,875</div>
            <p className="text-xs text-white">This month</p>
            <Progress value={65} className="mt-2 h-1 bg-[#2a2a3a]" />
            <p className="mt-1 text-xs text-white">65% of monthly budget</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              API Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24,521</div>
            <p className="text-xs text-white">This month</p>
            <Progress value={42} className="mt-2 h-1 bg-[#2a2a3a]" />
            <p className="mt-1 text-xs text-white">42% of monthly limit</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Avg. Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">245ms</div>
            <p className="text-xs text-white">Last 24 hours</p>
            <Progress value={22} className="mt-2 h-1 bg-[#2a2a3a]" />
            <p className="mt-1 text-xs text-white">22% of threshold</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Error Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0.8%</div>
            <p className="text-xs text-white">Last 24 hours</p>
            <Progress value={8} className="mt-2 h-1 bg-[#2a2a3a]" />
            <p className="mt-1 text-xs text-white">Well below 5% threshold</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-5 bg-[#2a2a3a]">
          <TabsTrigger
            value="usage"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Usage
          </TabsTrigger>
          <TabsTrigger
            value="models"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Models
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Performance
          </TabsTrigger>
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
        </TabsList>
        <TabsContent value="usage" className="space-y-4 pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Usage by Service</CardTitle>
              <CardDescription className="text-white">
                Breakdown of AI usage by service type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiUsageData.map((item) => (
                  <div key={item.service} className="space-y-2">
                    <div className="flex items-center">
                      <div className="mr-2">{item.icon}</div>
                      <div className="flex flex-1 items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium text-white">
                            {item.service}
                          </p>
                          <p className="text-xs text-white">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white">
                            ${item.cost}
                          </p>
                          <p className="text-xs text-white">
                            {item.calls} calls
                          </p>
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={item.percentage}
                      className="h-1 bg-[#2a2a3a]"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="models" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">AI Models</CardTitle>
              <CardDescription className="text-white">
                Performance and usage of different AI models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModels.map((model) => (
                  <div
                    key={model.name}
                    className="rounded-lg border border-[#2a2a3a] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-semibold text-white">
                          {model.name}
                        </h4>
                        <p className="text-sm text-white">
                          {model.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">
                          ${model.costPer1k} per 1k tokens
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">Usage</span>
                        <span className="text-white">{model.usage}%</span>
                      </div>
                      <Progress
                        value={model.usage}
                        className="h-1 bg-[#2a2a3a]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Performance Metrics</CardTitle>
              <CardDescription className="text-white">
                AI system performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-between gap-2">
                {performanceData.map((item, index) => (
                  <div
                    key={index}
                    className="relative h-full flex flex-col justify-end"
                  >
                    <div
                      className="w-8 bg-[#7b68ee] rounded-t-sm"
                      style={{ height: `${item.value}%` }}
                    />
                    <span className="mt-2 text-xs text-white">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
      </Tabs>
    </div>
  );
}

const aiUsageData = [
  {
    service: "Text Generation",
    description: "Chat and completion APIs",
    cost: 850,
    calls: 12500,
    percentage: 45,
    icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
  },
  {
    service: "Image Generation",
    description: "DALL-E and Stable Diffusion",
    cost: 620,
    calls: 3200,
    percentage: 33,
    icon: <Image className="h-4 w-4 text-purple-500" />,
  },
  {
    service: "Document Processing",
    description: "PDF and document analysis",
    cost: 280,
    calls: 5400,
    percentage: 15,
    icon: <FileText className="h-4 w-4 text-emerald-500" />,
  },
  {
    service: "Embeddings",
    description: "Vector embeddings for search",
    cost: 125,
    calls: 3421,
    percentage: 7,
    icon: <BrainCircuit className="h-4 w-4 text-amber-500" />,
  },
];

const aiModels = [
  {
    name: "GPT-4",
    description: "Advanced language model for complex tasks",
    costPer1k: 0.06,
    usage: 65,
  },
  {
    name: "GPT-3.5 Turbo",
    description: "Efficient language model for general use",
    costPer1k: 0.002,
    usage: 85,
  },
  {
    name: "DALL-E 3",
    description: "Image generation from text descriptions",
    costPer1k: 0.04,
    usage: 45,
  },
  {
    name: "Whisper",
    description: "Speech to text transcription",
    costPer1k: 0.006,
    usage: 30,
  },
];

const performanceData = [
  { label: "Mon", value: 65 },
  { label: "Tue", value: 70 },
  { label: "Wed", value: 60 },
  { label: "Thu", value: 75 },
  { label: "Fri", value: 80 },
  { label: "Sat", value: 65 },
  { label: "Sun", value: 60 },
];

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

// Import Badge component
import { Badge } from "@/UIComponents";
