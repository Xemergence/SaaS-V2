import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { Badge } from "@/UIComponents";
import { Button } from "@/UIComponents";
import { Switch } from "@/UIComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/UIComponents";
import {
  CircuitBoard,
  AlertTriangle,
  CheckCircle2,
  Settings as SettingsIcon,
} from "lucide-react";

interface SensorProps {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "warning";
  lastReading: string;
  lastUpdate: string;
  type: string;
  enabled: boolean;
}

function SensorStatusBadge({ status }: { status: SensorProps["status"] }) {
  if (status === "online") {
    return (
      <Badge className="bg-emerald-500 hover:bg-emerald-600">
        <CheckCircle2 className="mr-1 h-3 w-3" /> Online
      </Badge>
    );
  }
  if (status === "warning") {
    return (
      <Badge variant="outline" className="border-amber-500 text-amber-500">
        <AlertTriangle className="mr-1 h-3 w-3" /> Warning
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="border-slate-500 text-slate-500">
      Offline
    </Badge>
  );
}

export default function Sensors() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Sensor Management
        </h2>
        <p className="text-white">
          Monitor and configure connected sensors and data points.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Sensors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-white">Across 5 locations</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">21</div>
            <p className="text-xs text-white">87.5% of total</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">2</div>
            <p className="text-xs text-white">Requires attention</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Offline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-500">1</div>
            <p className="text-xs text-white">Maintenance required</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-4 bg-[#2a2a3a]">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="online"
              className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
            >
              Online
            </TabsTrigger>
            <TabsTrigger
              value="warnings"
              className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
            >
              Warnings
            </TabsTrigger>
            <TabsTrigger
              value="offline"
              className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
            >
              Offline
            </TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            size="sm"
            className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
          >
            <CircuitBoard className="mr-2 h-4 w-4" />
            Add Sensor
          </Button>
        </div>
        <TabsContent value="all" className="space-y-4 pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">All Sensors</CardTitle>
              <CardDescription className="text-white">
                View and manage all connected sensors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sensors.map((sensor) => (
                  <div
                    key={sensor.id}
                    className="rounded-lg border border-[#2a2a3a] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-white">
                          {sensor.name}
                        </h4>
                        <p className="text-sm text-white">{sensor.location}</p>
                      </div>
                      <SensorStatusBadge status={sensor.status} />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white">Last Reading</p>
                        <p className="font-medium text-white">
                          {sensor.lastReading}
                        </p>
                      </div>
                      <div>
                        <p className="text-white">Last Update</p>
                        <p className="font-medium text-white">
                          {sensor.lastUpdate}
                        </p>
                      </div>
                      <div>
                        <p className="text-white">Type</p>
                        <p className="font-medium text-white">{sensor.type}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-white">Enabled</p>
                        <Switch checked={sensor.enabled} />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-[#2a2a3a]"
                      >
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="online" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Online Sensors</CardTitle>
              <CardDescription className="text-white">
                All sensors currently online and reporting data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white">Online sensors content placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="warnings" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">
                Sensors with Warnings
              </CardTitle>
              <CardDescription className="text-white">
                Sensors reporting abnormal data or requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white">Warning sensors content placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="offline" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Offline Sensors</CardTitle>
              <CardDescription className="text-white">
                Sensors that are currently not reporting data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white">Offline sensors content placeholder</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const sensors: SensorProps[] = [
  {
    id: "sensor-001",
    name: "Server Room Temperature",
    location: "Data Center A",
    status: "online",
    lastReading: "22.5°C",
    lastUpdate: "2 minutes ago",
    type: "Temperature",
    enabled: true,
  },
  {
    id: "sensor-002",
    name: "Network Traffic Monitor",
    location: "Edge Router 1",
    status: "warning",
    lastReading: "95% utilization",
    lastUpdate: "5 minutes ago",
    type: "Network",
    enabled: true,
  },
  {
    id: "sensor-003",
    name: "Backup Power Supply",
    location: "Data Center B",
    status: "online",
    lastReading: "98% capacity",
    lastUpdate: "10 minutes ago",
    type: "Power",
    enabled: true,
  },
  {
    id: "sensor-004",
    name: "Database Server CPU",
    location: "Application Cluster",
    status: "online",
    lastReading: "45% utilization",
    lastUpdate: "3 minutes ago",
    type: "CPU",
    enabled: true,
  },
  {
    id: "sensor-005",
    name: "Storage Array",
    location: "SAN Cluster",
    status: "offline",
    lastReading: "No data",
    lastUpdate: "2 hours ago",
    type: "Storage",
    enabled: false,
  },
];
