import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { cn } from "@/lib/utils";

interface CostBreakdownProps {
  className?: string;
}

export default function CostBreakdown({ className }: CostBreakdownProps) {
  return (
    <Card className={cn("bg-[#1e1e2d] border-[#2a2a3a]", className)}>
      <CardHeader>
        <CardTitle className="text-white">Cost Breakdown</CardTitle>
        <CardDescription className="text-gray-300">
          Monthly expenses by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {costData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white">{item.category}</span>
                <span className="font-medium text-white">${item.amount}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#2a2a3a]">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <span className="font-medium text-white">Total</span>
          <span className="font-bold text-white">$4,385</span>
        </div>
      </CardContent>
    </Card>
  );
}

const costData = [
  { category: "Hosting", amount: 1250, percentage: 28.5, color: "#3b82f6" },
  { category: "AI Usage", amount: 1875, percentage: 42.8, color: "#8b5cf6" },
  { category: "Database", amount: 750, percentage: 17.1, color: "#10b981" },
  { category: "Taxes", amount: 510, percentage: 11.6, color: "#f43f5e" },
];
