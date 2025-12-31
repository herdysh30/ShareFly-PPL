import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    roleId: number;
}

const EditUser = ({ user }: { user: User }) => {
    const { data, setData, put, processing, errors } = useForm({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        roleId: String(user.roleId),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("dashboard.users.update", user.id));
    };

    return (
        <>
            <Head title="Edit User" />
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
                            Edit User
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="max-w-xl space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstname">First Name</Label>
                                <Input
                                    id="firstname"
                                    value={data.firstname}
                                    onChange={(e) =>
                                        setData("firstname", e.target.value)
                                    }
                                    className="bg-gray-800 border-gray-700"
                                />
                                {errors.firstname && (
                                    <p className="text-sm text-red-500">
                                        {errors.firstname}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input
                                    id="lastname"
                                    value={data.lastname}
                                    onChange={(e) =>
                                        setData("lastname", e.target.value)
                                    }
                                    className="bg-gray-800 border-gray-700"
                                />
                                {errors.lastname && (
                                    <p className="text-sm text-red-500">
                                        {errors.lastname}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                className="bg-gray-800 border-gray-700"
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="bg-gray-800 border-gray-700"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">
                                New Password (leave blank to keep current)
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="bg-gray-800 border-gray-700"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">
                                Confirm New Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className="bg-gray-800 border-gray-700"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Role</Label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="roleId"
                                        value="1"
                                        checked={data.roleId === "1"}
                                        onChange={(e) =>
                                            setData("roleId", e.target.value)
                                        }
                                        className="w-4 h-4"
                                    />
                                    <span>Admin</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="roleId"
                                        value="2"
                                        checked={data.roleId === "2"}
                                        onChange={(e) =>
                                            setData("roleId", e.target.value)
                                        }
                                        className="w-4 h-4"
                                    />
                                    <span>User</span>
                                </label>
                            </div>
                            {errors.roleId && (
                                <p className="text-sm text-red-500">
                                    {errors.roleId}
                                </p>
                            )}
                        </div>

                        <Button type="submit" disabled={processing}>
                            {processing ? "Updating..." : "Update User"}
                        </Button>
                    </form>
                </div>
            </DashboardLayout>
        </>
    );
};

export default EditUser;
