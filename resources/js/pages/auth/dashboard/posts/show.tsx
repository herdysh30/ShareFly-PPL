import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IPosts } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Calendar, Heart, MessageCircle, User } from "lucide-react";
import TimeAgo from "react-timeago";

const ShowPost = ({ post }: { post: IPosts }) => {
    return (
        <>
            <Head title={`Post by ${post.users?.username || "Unknown"}`} />
            <DashboardLayout>
                <div className="flex-1 p-6 text-gray-300 bg-gray-900">
                    <div className="flex items-center gap-4 mb-6">
                        <Button variant="ghost" asChild>
                            <Link href={route("dashboard.posts")}>
                                <ArrowLeft className="mr-2 size-4" />
                                Back
                            </Link>
                        </Button>
                        <h2 className="text-2xl font-bold text-white">
                            Post Details
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Post Image
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <img
                                    src={
                                        post.image?.startsWith("http")
                                            ? post.image
                                            : `/storage/${post.image}`
                                    }
                                    alt="Post"
                                    className="w-full rounded-lg"
                                />
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Post Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="size-5 text-gray-400" />
                                    <span>
                                        {post.users?.firstname}{" "}
                                        {post.users?.lastname} (@
                                        {post.users?.username})
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="size-5 text-gray-400" />
                                    <TimeAgo date={post.created_at} />
                                </div>

                                <div className="flex items-center gap-3">
                                    <Heart className="size-5 text-gray-400" />
                                    <span>{post.likes_count || 0} likes</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MessageCircle className="size-5 text-gray-400" />
                                    <span>
                                        {post.comments_count || 0} comments
                                    </span>
                                </div>

                                <div className="pt-4 border-t border-gray-700">
                                    <h4 className="mb-2 font-semibold text-white">
                                        Description
                                    </h4>
                                    <p className="text-gray-300">
                                        {post.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default ShowPost;
