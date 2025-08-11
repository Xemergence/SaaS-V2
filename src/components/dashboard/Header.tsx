import { Bell, Search, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/UIComponents";
import { Input } from "@/UIComponents";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/UIComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/UIComponents";
import { useState, useEffect } from "react";
import {
  getCurrentUserWithRole,
  getUserDisplayName,
  getUserInitials,
  getAvatarSeed,
  signOutUser,
  UserRole,
} from "@/lib/auth";

export default function Header() {
  const [user, setUser] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user with role information
    const getCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUserWithRole();
        setUser(currentUser);
      } catch (error) {
        console.error("Error getting current user:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  if (loading) {
    return (
      <header className="border-b border-[#2a2a3a] bg-[#1e1e2d]">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[150px] md:w-[200px] lg:w-[300px] pl-8 bg-[#2a2a3a] border-[#3a3a4a] text-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-[#2a2a3a] animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-[#2a2a3a] bg-[#1e1e2d]">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[150px] md:w-[200px] lg:w-[300px] pl-8 bg-[#2a2a3a] border-[#3a3a4a] text-white"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-[#2a2a3a]"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full hover:bg-[#2a2a3a]"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(user)}`}
                    alt="User Avatar"
                  />
                  <AvatarFallback className="bg-[#7b68ee] text-white text-xs font-medium">
                    {getUserInitials(user)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-[#1e1e2d] border-[#2a2a3a] text-white"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {getUserDisplayName(user)}
                  </p>
                  <p className="text-xs leading-none text-gray-300">
                    {user?.email || "No email"}
                  </p>
                  <p className="text-xs leading-none text-[#7b68ee] font-medium">
                    {user?.role === "admin" ? "Administrator" : "User"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#2a2a3a]" />
              <DropdownMenuItem className="text-white hover:bg-[#2a2a3a] cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-[#2a2a3a] cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#2a2a3a]" />
              <DropdownMenuItem
                className="text-white hover:bg-[#2a2a3a] cursor-pointer"
                onClick={signOutUser}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
