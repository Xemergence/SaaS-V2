import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { Button } from "@/UIComponents";
import { Input } from "@/UIComponents";
import { Label } from "@/UIComponents";
import { Switch } from "@/UIComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/UIComponents";
import { Separator } from "@/UIComponents";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Settings
        </h2>
        <p className="text-white">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-[#2a2a3a]">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="data-[state=active]:bg-[#7b68ee] data-[state=active]:text-white"
          >
            API
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-gray-300">
                Update your account profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-white">
                    First name
                  </Label>
                  <Input
                    id="first-name"
                    defaultValue="John"
                    className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-white">
                    Last name
                  </Label>
                  <Input
                    id="last-name"
                    defaultValue="Doe"
                    className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">
                  Company
                </Label>
                <Input
                  id="company"
                  defaultValue="Acme Inc."
                  className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">Appearance</CardTitle>
              <CardDescription className="text-gray-300">
                Customize the appearance of the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode" className="text-white">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-gray-300">
                    Use dark theme for the dashboard
                  </p>
                </div>
                <Switch id="dark-mode" />
              </div>
              <Separator className="bg-[#2a2a3a]" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-view" className="text-white">
                    Compact View
                  </Label>
                  <p className="text-sm text-gray-300">
                    Reduce padding and spacing
                  </p>
                </div>
                <Switch id="compact-view" />
              </div>
              <Separator className="bg-[#2a2a3a]" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations" className="text-white">
                    Animations
                  </Label>
                  <p className="text-sm text-gray-300">
                    Enable animations throughout the interface
                  </p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">
                Notification Settings
              </CardTitle>
              <CardDescription className="text-gray-300">
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-gray-300">
                    Receive notifications via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-[#2a2a3a]" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Push Notifications</Label>
                  <p className="text-sm text-gray-300">
                    Receive notifications in the browser
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-[#2a2a3a]" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">SMS Notifications</Label>
                  <p className="text-sm text-gray-300">
                    Receive critical alerts via SMS
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="api" className="pt-4">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <CardTitle className="text-white">API Keys</CardTitle>
              <CardDescription className="text-gray-300">
                Manage your API keys for external integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Primary API Key</Label>
                <div className="flex gap-2">
                  <Input
                    value="sk_live_51NZgGtKSn9ArdBe5D..."
                    readOnly
                    className="font-mono bg-[#2a2a3a] border-[#3a3a4a] text-white"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#2a2a3a] text-white hover:bg-[#2a2a3a]"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-gray-300">Last used: 2 hours ago</p>
              </div>
              <Separator className="bg-[#2a2a3a]" />
              <div className="space-y-2">
                <Label className="text-white">Secondary API Key</Label>
                <div className="flex gap-2">
                  <Input
                    value="sk_live_51NZgGtKSn9ArdBe5E..."
                    readOnly
                    className="font-mono bg-[#2a2a3a] border-[#3a3a4a] text-white"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#2a2a3a] text-white hover:bg-[#2a2a3a]"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-gray-300">Last used: 5 days ago</p>
              </div>
              <Separator className="bg-[#2a2a3a]" />
              <div className="space-y-2">
                <Label className="text-white">Webhook Secret</Label>
                <div className="flex gap-2">
                  <Input
                    value="whsec_12345abcdef..."
                    readOnly
                    className="font-mono bg-[#2a2a3a] border-[#3a3a4a] text-white"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#2a2a3a] text-white hover:bg-[#2a2a3a]"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-gray-300">
                  For verifying webhook signatures
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="border-[#2a2a3a] text-white hover:bg-[#2a2a3a]"
              >
                Regenerate Keys
              </Button>
              <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
