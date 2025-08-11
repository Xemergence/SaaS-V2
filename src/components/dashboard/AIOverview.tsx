import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/UIComponents";
import { Progress } from "@/UIComponents";
import {
  BrainCircuit,
  Cpu,
  MessageSquare,
  Image,
  FileText,
} from "lucide-react";

export default function AIOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          AI Overview
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

      <Tabs defaultValue="usage">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-[#2a2a3a]">
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
