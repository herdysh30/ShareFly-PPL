import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IPosts } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

const EditPost = ({ post }: { post: IPosts }) => {
    const {
        data,
        setData,
        post: submitForm,
        processing,
        errors,
    } = useForm({
        description: post.description || "",
        image: null as File | null,
        _method: "PUT",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm(route("dashboard.posts.update", post.id), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit Post" />
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
                            Edit Post
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="max-w-xl space-y-6"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="Enter post description..."
                                className="bg-gray-800 border-gray-700"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Current Image</Label>
                            <img
                                src={
                                    post.image.startsWith("http")
                                        ? post.image
                                        : `/storage/${post.image}`
                                }
                                alt="Current post image"
                                className="w-48 h-48 object-cover rounded"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">New Image (optional)</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        "image",
                                        e.target.files?.[0] || null
                                    )
                                }
                                className="bg-gray-800 border-gray-700"
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        <Button type="submit" disabled={processing}>
                            {processing ? "Updating..." : "Update Post"}
                        </Button>
                    </form>
                </div>
            </DashboardLayout>
        </>
    );
};

export default EditPost;
