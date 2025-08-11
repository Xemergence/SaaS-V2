import { Card, CardContent, CardHeader, CardTitle } from "@/UIComponents";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function MetricCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn("overflow-hidden bg-[#1e1e2d] border-[#2a2a3a]", className)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-white">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {trend && (
          <p className="text-xs text-gray-300 flex items-center mt-1">
            {trend.isPositive ? (
              <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
            ) : (
              <ArrowDown className="mr-1 h-3 w-3 text-rose-500" />
            )}
            <span
              className={cn(
                trend.isPositive ? "text-emerald-500" : "text-rose-500",
              )}
            >
              {trend.value}%
            </span>
            {description && (
              <span className="ml-1 text-gray-300">{description}</span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
