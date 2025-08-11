import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { cn } from "@/lib/utils";

interface RevenueChartProps {
  className?: string;
}

export default function RevenueChart({ className }: RevenueChartProps) {
  return (
    <Card className={cn("bg-[#1e1e2d] border-[#2a2a3a]", className)}>
      <CardHeader>
        <CardTitle className="text-white">Revenue Overview</CardTitle>
        <CardDescription className="text-gray-300">
          Monthly revenue breakdown for the current year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-end justify-between gap-2">
          {mockChartData.map((item, index) => (
            <div
              key={index}
              className="relative h-full flex flex-col justify-end"
            >
              <div
                className="w-8 bg-[#7b68ee] rounded-t-sm"
                style={{ height: `${item.value}%` }}
              />
              <span className="mt-2 text-xs text-gray-300">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const mockChartData = [
  { label: "Jan", value: 35 },
  { label: "Feb", value: 45 },
  { label: "Mar", value: 40 },
  { label: "Apr", value: 60 },
  { label: "May", value: 55 },
  { label: "Jun", value: 70 },
  { label: "Jul", value: 65 },
  { label: "Aug", value: 75 },
  { label: "Sep", value: 85 },
  { label: "Oct", value: 80 },
  { label: "Nov", value: 90 },
  { label: "Dec", value: 95 },
];
