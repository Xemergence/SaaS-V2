import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";

interface RecentActivityProps {
  className?: string;
}

type ActivityType = "info" | "success" | "warning" | "error";

interface Activity {
  id: number;
  type: ActivityType;
  message: string;
  timestamp: Date;
}

function getActivityIcon(type: ActivityType) {
  switch (type) {
    case "info":
      return <Info className="h-4 w-4 text-blue-500" />;
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    case "error":
      return <XCircle className="h-4 w-4 text-rose-500" />;
  }
}

export default function RecentActivity({ className }: RecentActivityProps) {
  return (
    <Card className={cn("bg-[#1e1e2d] border-[#2a2a3a]", className)}>
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
        <CardDescription className="text-gray-300">
          Latest system events and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 text-sm">
              <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 space-y-1">
                <p className="text-white">{activity.message}</p>
                <p className="text-xs text-gray-300">
                  {format(activity.timestamp, "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const activities: Activity[] = [
  {
    id: 1,
    type: "success",
    message: "Database backup completed successfully",
    timestamp: new Date(2023, 5, 15, 9, 30),
  },
  {
    id: 2,
    type: "warning",
    message: "API response time increased by 15%",
    timestamp: new Date(2023, 5, 15, 8, 45),
  },
  {
    id: 3,
    type: "info",
    message: "New user registration: john.doe@example.com",
    timestamp: new Date(2023, 5, 15, 7, 20),
  },
  {
    id: 4,
    type: "error",
    message: "Payment processing failed for customer #38291",
    timestamp: new Date(2023, 5, 14, 23, 15),
  },
  {
    id: 5,
    type: "success",
    message: "System update deployed to production",
    timestamp: new Date(2023, 5, 14, 18, 0),
  },
];
