import { ChartArea } from "@/components/ui/area-chart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChartBar } from "@/components/ui/bar-chart";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChartPie } from "@/components/ui/pie-chart";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
    ChevronDown,
    Heart,
    Image,
    MessageSquare,
    User,
    Users,
} from "lucide-react";

interface Stats {
    totalUsers: number;
    totalPosts: number;
    totalLikes: number;
    totalComments: number;
    totalStories: number;
}

interface PostsPerDay {
    date: string;
    posts: number;
    likes: number;
}

interface TopUser {
    name: string;
    posts: number;
}

interface RoleDistribution {
    role: string;
    value: number;
}

interface Props {
    stats: Stats;
    postsPerDay: PostsPerDay[];
    topUsers: TopUser[];
    roleDistribution: RoleDistribution[];
}

const MainDashboard = ({
    stats,
    postsPerDay,
    topUsers,
    roleDistribution,
}: Props) => {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Dashboard Overview" />
            <DashboardLayout>
                <div className="items-center flex-1 p-5 space-y-4 text-gray-300 h-max">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">
                            Overview
                        </h2>
                        <div className="flex items-center gap-5">
                            <form action="">
                                <Input
                                    className="border-foreground"
                                    placeholder="Search..."
                                />
                            </form>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex justify-between gap-2 p-2 border rounded-lg border-foreground">
                                    <Avatar>
                                        <AvatarImage
                                            src={auth?.user?.profile_picture}
                                        />
                                    </Avatar>
                                    <div className="grid text-left">
                                        <span>
                                            {auth?.user?.firstname}{" "}
                                            {auth?.user?.lastname}
                                        </span>
                                        <span className="text-xs">
                                            {auth?.user?.role?.name}
                                        </span>
                                    </div>
                                    <Button variant={"ghost"} size={"icon"}>
                                        <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border border-white bg-gray-900 rounded-lg w-36 mt-0.5 overflow-hidden p-2">
                                    <DropdownMenuItem asChild>
                                        <Link href={route("profile.edit")}>
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="w-full text-left"
                                        >
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div className="flex items-center justify-between flex-1 p-4 border rounded-lg border-foreground">
                            <div className="grid">
                                <span className="text-sm text-gray-400">
                                    Total Users
                                </span>
                                <span className="text-2xl font-bold">
                                    {stats.totalUsers.toLocaleString()}
                                </span>
                            </div>
                            <div className="p-3 rounded-full bg-blue-500/20">
                                <Users className="text-blue-400" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between flex-1 p-4 border rounded-lg border-foreground">
                            <div className="grid">
                                <span className="text-sm text-gray-400">
                                    Total Posts
                                </span>
                                <span className="text-2xl font-bold">
                                    {stats.totalPosts.toLocaleString()}
                                </span>
                            </div>
                            <div className="p-3 rounded-full bg-green-500/20">
                                <Image className="text-green-400" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between flex-1 p-4 border rounded-lg border-foreground">
                            <div className="grid">
                                <span className="text-sm text-gray-400">
                                    Total Likes
                                </span>
                                <span className="text-2xl font-bold">
                                    {stats.totalLikes.toLocaleString()}
                                </span>
                            </div>
                            <div className="p-3 rounded-full bg-red-500/20">
                                <Heart className="text-red-400" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between flex-1 p-4 border rounded-lg border-foreground">
                            <div className="grid">
                                <span className="text-sm text-gray-400">
                                    Total Comments
                                </span>
                                <span className="text-2xl font-bold">
                                    {stats.totalComments.toLocaleString()}
                                </span>
                            </div>
                            <div className="p-3 rounded-full bg-purple-500/20">
                                <MessageSquare className="text-purple-400" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between flex-1 p-4 border rounded-lg border-foreground">
                            <div className="grid">
                                <span className="text-sm text-gray-400">
                                    Total Stories
                                </span>
                                <span className="text-2xl font-bold">
                                    {stats.totalStories.toLocaleString()}
                                </span>
                            </div>
                            <div className="p-3 rounded-full bg-yellow-500/20">
                                <User className="text-yellow-400" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <ChartArea data={postsPerDay} />
                        <ChartBar data={topUsers} />
                        <ChartPie data={roleDistribution} />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default MainDashboard;
