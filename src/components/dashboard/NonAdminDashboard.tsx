import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { Button } from "@/UIComponents";
import { Badge } from "@/UIComponents";
import { Package, Clock, ShoppingCart, User } from "lucide-react";

export default function NonAdminDashboard() {
  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  return (
    <div className="min-h-screen bg-[#121218] text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7b68ee] to-[#9b59b6] flex items-center justify-center mx-auto">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome to xEmergence
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Your personalized dashboard for tracking orders, managing
            preferences, and accessing integrated services. More features coming
            in 2026!
          </p>
          <Badge className="bg-[#7b68ee] text-white px-3 py-1 sm:px-4 sm:py-2">
            Customer Portal - 2026
          </Badge>
        </div>

        {/* Order Tracking Container - Only keep this one */}
        <div className="grid gap-6">
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#2a2a3a]">
                  <Package className="h-5 w-5 text-[#7b68ee]" />
                </div>
                <CardTitle className="text-white">Order Tracking</CardTitle>
              </div>
              <CardDescription className="text-gray-300">
                Track your custom 3D prints and product orders in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Real-time order status updates</p>
                <p>• Shipping notifications</p>
                <p>• Order history and receipts</p>
                <p>• Delivery tracking</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline - Updated to start from current month and end in 2026 */}
        <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#7b68ee]" />
              Development Timeline
            </CardTitle>
            <CardDescription className="text-gray-300">
              Here's what's coming to your customer portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-[#7b68ee] mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white">
                    {currentMonth} {currentYear}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    User authentication and basic profile setup
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-[#2a2a3a] mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white">Q1 2025</h4>
                  <p className="text-gray-300 text-sm">
                    Order tracking and notification system
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-[#2a2a3a] mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white">Q3 2025</h4>
                  <p className="text-gray-300 text-sm">
                    Advanced order management and tracking features
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-[#2a2a3a] mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white">Q1 2026</h4>
                  <p className="text-gray-300 text-sm">
                    Full customer portal with all integrated features
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <p className="text-gray-300">
            In the meantime, you can continue shopping and placing orders
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white"
              onClick={() => (window.location.href = "/products")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Browse Products
            </Button>
            <Button
              variant="outline"
              className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
              onClick={() => (window.location.href = "/custom-3d-print")}
            >
              <Package className="mr-2 h-4 w-4" />
              Custom 3D Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
