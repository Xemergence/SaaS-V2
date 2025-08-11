import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/UIComponents";
import { Button } from "@/UIComponents";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/UIComponents";
import { useState } from "react";

export default function Financial() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Financial Overview
          </h2>
          <p className="text-white">
            Detailed breakdown of your business finances.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button
            variant="outline"
            size="sm"
            className="border-[#2a2a3a] text-white hover:bg-[#2a2a3a]"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="costs">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-[#2a2a3a]">
          <TabsTrigger
            value="costs"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Costs
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger
            value="profit"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Profit
          </TabsTrigger>
        </TabsList>
        <TabsContent value="costs" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Total Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$24,358</div>
                <p className="text-xs text-white">For selected period</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Hosting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$8,245</div>
                <p className="text-xs text-white">33.8% of total costs</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  AI Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$10,532</div>
                <p className="text-xs text-white">43.2% of total costs</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Taxes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$5,581</div>
                <p className="text-xs text-white">22.9% of total costs</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Cost Trends</CardTitle>
              <CardDescription className="text-white">
                Monthly cost breakdown for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] flex items-end justify-between gap-2">
                {mockCostData.map((item, index) => (
                  <div
                    key={index}
                    className="relative h-full flex flex-col justify-end gap-1 w-full max-w-[40px]"
                  >
                    <div className="flex flex-col h-full justify-end gap-1 w-full">
                      <div
                        className="w-full bg-rose-500 rounded-t-sm"
                        style={{ height: `${(item.taxes * 100) / 2500}%` }}
                      />
                      <div
                        className="w-full bg-[#7b68ee] rounded-none"
                        style={{ height: `${(item.ai * 100) / 2500}%` }}
                      />
                      <div
                        className="w-full bg-blue-500 rounded-b-sm"
                        style={{ height: `${(item.hosting * 100) / 2500}%` }}
                      />
                    </div>
                    <span className="mt-2 text-xs text-white text-center">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-white">Hosting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#7b68ee]" />
                  <span className="text-sm text-white">AI Usage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <span className="text-sm text-white">Taxes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="revenue" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Revenue Data</CardTitle>
              <CardDescription className="text-white">
                Revenue details will be displayed here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white">Revenue content placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profit" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Profit Analysis</CardTitle>
              <CardDescription className="text-white">
                Profit details will be displayed here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white">Profit content placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const mockCostData = [
  { month: "Jan", hosting: 650, ai: 850, taxes: 450 },
  { month: "Feb", hosting: 700, ai: 900, taxes: 470 },
  { month: "Mar", hosting: 680, ai: 920, taxes: 460 },
  { month: "Apr", hosting: 720, ai: 950, taxes: 480 },
  { month: "May", hosting: 750, ai: 980, taxes: 490 },
  { month: "Jun", hosting: 780, ai: 1020, taxes: 510 },
];
