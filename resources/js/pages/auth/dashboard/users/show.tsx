import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Calendar, Mail, Phone, Shield } from "lucide-react";
import TimeAgo from "react-timeago";

interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    no_telepon: string | null;
    profile_picture: string | null;
    roleId: number;
    role?: { name: string };
    created_at: string;
    posts?: Array<{ id: number; description: string; image: string }>;
}

const ShowUser = ({ user }: { user: User }) => {
    return (
        <>
            <Head title={`User: ${user.username}`} />
            <DashboardLayout>
                <div className="flex-1 p-6 text-gray-300 bg-gray-900">
                    <div className="flex items-center gap-4 mb-6">
                        <Button variant="ghost" asChild>
                            <Link href={route("dashboard.users")}>
                                <ArrowLeft className="mr-2 size-4" />
                                Back
                            </Link>
                        </Button>
                        <h2 className="text-2xl font-bold text-white">
                            User Details
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-20 h-20">
                                        <AvatarImage
                                            src={
                                                user.profile_picture ||
                                                `https://ui-avatars.com/api/?name=${user.username}`
                                            }
                                        />
                                    </Avatar>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            {user.firstname} {user.lastname}
                                        </h3>
                                        <p className="text-gray-400">
                                            @{user.username}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <Mail className="size-5 text-gray-400" />
                                        <span>{user.email}</span>
                                    </div>

                                    {user.no_telepon && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="size-5 text-gray-400" />
                                            <span>{user.no_telepon}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <Shield className="size-5 text-gray-400" />
                                        <span className="px-2 py-1 text-xs rounded bg-primary/20 text-primary">
                                            {user.role?.name ||
                                                (user.roleId === 1
                                                    ? "Admin"
                                                    : "User")}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Calendar className="size-5 text-gray-400" />
                                        <span>
                                            Joined{" "}
                                            <TimeAgo date={user.created_at} />
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Recent Posts ({user.posts?.length || 0})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {user.posts && user.posts.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2">
                                        {user.posts.slice(0, 6).map((post) => (
                                            <img
                                                key={post.id}
                                                src={
                                                    post.image?.startsWith(
                                                        "http"
                                                    )
                                                        ? post.image
                                                        : `/storage/${post.image}`
                                                }
                                                alt={post.description}
                                                className="w-full h-24 object-cover rounded"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">
                                        No posts yet
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default ShowUser;
