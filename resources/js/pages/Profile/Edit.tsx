import { Head, usePage } from "@inertiajs/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    BadgeCheckIcon,
    Grid3X3,
} from "lucide-react";
import { Link } from "@inertiajs/react";

interface Post {
    id: number;
    description: string;
    image: string;
    created_at: string;
}

interface EditProps {
    mustVerifyEmail: boolean;
    status?: string;
    posts?: Post[];
}

export default function Edit({ mustVerifyEmail, status, posts }: EditProps) {
    const { auth } = usePage().props;

    const contextData = {
        canLogin: false,
        canRegister: false,
        hasHome: true,
    };

    return (
        <HomeContext.Provider value={contextData}>
            <Head title="Profile" />
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
                            {auth.user?.profile_background && (
                                <img
                                    src={auth.user.profile_background}
                                    alt="Profile Background"
                                    className="object-cover w-full h-full rounded-t-lg"
                                />
                            )}
                        </div>

                        <CardHeader className="relative -mt-16 text-center">
                            <Avatar className="w-24 h-24 mx-auto border-4 border-background">
                                <AvatarImage
                                    src={
                                        auth.user?.profile_picture ||
                                        "https://ui-avatars.com/api/?name=" +
                                            auth.user?.username
                                    }
                                    alt={auth.user?.username}
                                />
                            </Avatar>
                            <CardTitle className="flex items-center justify-center gap-2 mt-2">
                                {auth.user?.firstname} {auth.user?.lastname}
                                {auth.user?.verified_at && (
                                    <BadgeCheckIcon className="text-blue-500 size-5" />
                                )}
                            </CardTitle>
                            <CardDescription>
                                @{auth.user?.username}
                            </CardDescription>
                        </CardHeader>

                        <Separator />

                        <CardContent className="p-6 space-y-4">
                            {/* Bio */}
                            <div>
                                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                                    Bio
                                </h3>
                                <p className="text-sm">
                                    {auth.user?.bio || "No bio yet"}
                                </p>
                            </div>

                            {/* Info */}
                            <div className="grid gap-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="size-4 text-muted-foreground" />
                                    <span>{auth.user?.email}</span>
                                </div>
                                {auth.user?.no_telepon && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="size-4 text-muted-foreground" />
                                        <span>{auth.user.no_telepon}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="size-4 text-muted-foreground" />
                                    <span>
                                        Joined{" "}
                                        {new Date(
                                            auth.user?.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Role Badge */}
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                                    {auth.user?.role?.name || "User"}
                                </span>
                            </div>

                            {/* Status Messages */}
                            {mustVerifyEmail &&
                                !auth.user?.email_verified_at && (
                                    <div className="p-3 text-sm text-yellow-600 rounded-lg bg-yellow-100/50">
                                        Your email address is unverified.
                                    </div>
                                )}

                            {status === "profile-updated" && (
                                <div className="p-3 text-sm text-green-600 rounded-lg bg-green-100/50">
                                    Profile updated successfully.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Posts Grid */}
                    <Card className="w-full max-w-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Grid3X3 className="size-5" />
                                My Posts ({posts?.length || 0})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {posts && posts.length > 0 ? (
                                <div className="grid grid-cols-3 gap-2">
                                    {posts.map((post) => (
                                        <div
                                            key={post.id}
                                            className="relative aspect-square group"
                                        >
                                            <img
                                                src={
                                                    post.image?.startsWith(
                                                        "http"
                                                    )
                                                        ? post.image
                                                        : `/storage/${post.image}`
                                                }
                                                alt={post.description}
                                                className="object-cover w-full h-full rounded-lg"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg">
                                                <p className="p-2 text-xs text-center text-white line-clamp-3">
                                                    {post.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground">
                                    No posts yet. Share your first post!
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </HomeContext.Provider>
    );
}
