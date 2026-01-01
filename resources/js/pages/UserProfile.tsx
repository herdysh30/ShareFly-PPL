import { Head, Link, usePage } from "@inertiajs/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/layouts/AppLayout";
import { HomeContext } from "@/pages/Home";
import { ArrowLeft, Calendar, BadgeCheckIcon } from "lucide-react";
import ProfilePostCard from "@/components/ProfilePostCard";
import { IPosts } from "@/types";

interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    bio: string;
    profile_picture: string;
    profile_background: string;
    verified_at: string | null;
    created_at: string;
    role: {
        name: string;
    };
}

interface Props {
    user: User;
    posts: IPosts[];
    canLogin: boolean;
    canRegister: boolean;
    hasHome: boolean;
}

export default function UserProfile({
    user,
    posts,
    canLogin,
    canRegister,
    hasHome,
}: Props) {
    const { auth } = usePage().props;

    const contextData = {
        canLogin,
        canRegister,
        hasHome,
    };

    return (
        <HomeContext.Provider value={contextData}>
            <Head title={`${user.username} - Profile`} />
            <AppLayout>
                <div className="flex flex-col items-center gap-4 p-4">
                    {/* Back Button */}
                    <div className="w-full max-w-2xl">
                        <Button variant="ghost" asChild>
                            <Link href={route("home")}>
                                <ArrowLeft className="mr-2 size-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    {/* Profile Card */}
                    <Card className="w-full max-w-2xl">
                        {/* Profile Background */}
                        <div className="relative h-32 bg-gradient-to-r from-primary to-primary/50 rounded-t-lg">
                            {user.profile_background && (
                                <img
                                    src={user.profile_background}
                                    alt="Profile Background"
                                    className="object-cover w-full h-full rounded-t-lg"
                                />
                            )}
                        </div>

                        <CardHeader className="relative -mt-16 text-center">
                            <Avatar className="w-24 h-24 mx-auto border-4 border-background">
                                <AvatarImage
                                    src={user.profile_picture}
                                    alt={user.username}
                                />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                    {user.username?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle className="flex items-center justify-center gap-2 mt-2">
                                {user.firstname} {user.lastname}
                                {user.verified_at && (
                                    <BadgeCheckIcon className="text-blue-500 size-5" />
                                )}
                            </CardTitle>
                            <CardDescription>@{user.username}</CardDescription>
                        </CardHeader>

                        <Separator />

                        <CardContent className="p-6 space-y-4">
                            {/* Bio */}
                            <div>
                                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                                    Bio
                                </h3>
                                <p className="text-sm">
                                    {user.bio || "No bio yet"}
                                </p>
                            </div>

                            {/* Info */}
                            <div className="grid gap-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="size-4 text-muted-foreground" />
                                    <span>
                                        Joined{" "}
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Role Badge */}
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                                    {user.role?.name || "User"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Posts Grid */}
                    <div className="w-full max-w-2xl">
                        <ProfilePostCard posts={posts} />
                    </div>
                </div>
            </AppLayout>
        </HomeContext.Provider>
    );
}
