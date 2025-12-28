import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IMeta, IPosts } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import TimeAgo from "react-timeago";

const PostsDashboard = ({ posts }: { posts: IMeta<IPosts> }) => {
    const toast = useToast();

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route("dashboard.posts.delete", id), {
                onSuccess: () =>
                    toast("Delete post success", { type: "success" }),
            });
        }
    };

    return (
        <>
            <Head title="Dashboard Post" />
            <DashboardLayout>
                <div className="flex-1 p-6 text-gray-300 bg-gray-900">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">
                            Dashboard Post
                        </h2>
                        <Button asChild>
                            <Link href={route("dashboard.posts.create")}>
                                <Plus className="mr-2 size-4" />
                                Create Post
                            </Link>
                        </Button>
                    </div>
                    <table className="w-full border border-collapse border-gray-700 table-auto">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-4 py-2 border border-gray-700">
                                    No
                                </th>
                                <th className="px-4 py-2 border border-gray-700">
                                    Image
                                </th>
                                <th className="px-4 py-2 border border-gray-700">
                                    Description
                                </th>
                                <th className="px-4 py-2 border border-gray-700">
                                    User
                                </th>
                                <th className="px-4 py-2 border border-gray-700">
                                    Post Created
                                </th>
                                <th className="px-4 py-2 border border-gray-700">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.data?.map((post, i) => (
                                <tr key={i} className="hover:bg-gray-800">
                                    <td className="px-4 py-2 border border-gray-700">
                                        {i + 1}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-700">
                                        <img
                                            src={
                                                post.image?.startsWith("http")
                                                    ? post.image
                                                    : `/storage/${post.image}`
                                            }
                                            alt="Post"
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border border-gray-700">
                                        {post.description}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-700">
                                        {post.users?.firstname}{" "}
                                        {post.users?.lastname}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-700">
                                        <TimeAgo date={post.created_at} />
                                    </td>
                                    <td className="flex justify-center gap-2 px-4 py-2 border border-gray-700">
                                        <Button
                                            size={"icon"}
                                            variant={"outline"}
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.posts.show",
                                                    post.id
                                                )}
                                            >
                                                <Eye />
                                            </Link>
                                        </Button>
                                        <Button
                                            className="bg-foreground hover:bg-foreground/70"
                                            size={"icon"}
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.posts.edit",
                                                    post.id
                                                )}
                                            >
                                                <Edit />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant={"destructive"}
                                            size={"icon"}
                                            onClick={() =>
                                                handleDelete(post.id)
                                            }
                                        >
                                            <Trash2 />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardLayout>
        </>
    );
};

export default PostsDashboard;
