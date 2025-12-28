import { ChartArea } from "@/components/ui/area-chart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChartBar } from "@/components/ui/bar-chart";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChartPie } from "@/components/ui/pie-chart";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Bell, ChevronDown, User } from "lucide-react";

const MainDashboard = () => {
  const { auth } = usePage().props

  return (
    <>
      <Head title="Dashboard Post" />
      <DashboardLayout>
        <div className="items-center flex-1 p-5 space-y-4 text-gray-300 h-max">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Overview</h2>
            <div className="flex items-center gap-5">
              <form action="">
                <Input className="border-foreground" placeholder="Search..." />
              </form>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex justify-between gap-2 p-2 border rounded-lg border-foreground">
                  <Avatar>
                    <AvatarImage src={auth?.user?.profile_picture} />
                  </Avatar>
                  <div className="grid text-left">
                    <span>{auth?.user?.firstname} {auth?.user?.lastname}</span>
                    <span className="text-xs">{auth?.user?.role?.name}</span>
                  </div>
                  <Button variant={'ghost'} size={'icon'}>
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border border-white bg-gray-900 rounded-lg w-36 mt-0.5 overflow-hidden p-2">
                  <DropdownMenuItem asChild>
                    <Link href={route('profile')}>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center justify-between flex-1 p-2 border rounded-lg border-foreground">
              <div className="grid">
                <span>Total User</span>
                <span>13.000</span>
              </div>
              <div className="grid gap-2">
                <User className="mx-auto" />
                <span className="text-xs text-green-500">+2.51%</span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-1 p-2 border rounded-lg border-foreground">
              <div className="grid">
                <span>Total Post</span>
                <span>13.000</span>
              </div>
              <div className="grid gap-2">
                <User className="mx-auto" />
                <span className="text-xs text-green-500">+2.51%</span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-1 p-2 border rounded-lg border-foreground">
              <div className="grid">
                <span>Total Like</span>
                <span>13.000</span>
              </div>
              <div className="grid gap-2">
                <User className="mx-auto" />
                <span className="text-xs text-green-500">+2.51%</span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-1 p-2 border rounded-lg border-foreground">
              <div className="grid">
                <span>Total Comment</span>
                <span>13.000</span>
              </div>
              <div className="grid gap-2">
                <User className="mx-auto" />
                <span className="text-xs text-green-500">+2.51%</span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-1 p-2 border rounded-lg border-foreground">
              <div className="grid">
                <span>Total Share</span>
                <span>13.000</span>
              </div>
              <div className="grid gap-2">
                <User className="mx-auto" />
                <span className="text-xs text-green-500">+2.51%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChartArea />
            <ChartBar />
            <ChartPie />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default MainDashboard;
