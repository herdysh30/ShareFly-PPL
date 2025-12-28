import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IMeta, User } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import {
    BadgeCheckIcon,
    Ban,
    CheckSquare,
    Edit,
    Eye,
    Plus,
    Trash2,
} from "lucide-react";
import TimeAgo from "react-timeago";

const UsersDashboard = ({ users }: { users: IMeta<User> }) => {
    const toast = useToast();

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("dashboard.users.delete", id), {
                onSuccess: () =>
                    toast("Delete user success", { type: "success" }),
            });
        }
    };

    return (
        <>
            <Head title="Dashboard Users" />
            <DashboardLayout>
                <div className="flex-1 p-6 text-gray-300 bg-gray-900">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">
                            Dashboard Users
                        </h2>
                        <Button asChild>
                            <Link href={route("dashboard.users.create")}>
                                <Plus className="mr-2 size-4" />
                                Create User
                            </Link>
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border border-collapse border-gray-700 table-auto">
                            <thead>
                                <tr className="bg-gray-800">
                                    <th className="px-4 py-2 border border-gray-700">
                                        No
                                    </th>
                                    <th className="px-4 py-2 border border-gray-700">
                                        Name
                                    </th>
                                    <th className="px-4 py-2 border border-gray-700">
                                        Username
                                    </th>
                                    <th className="px-4 py-2 border border-gray-700">
                                        Email
                                    </th>
                                    <th className="px-4 py-2 border border-gray-700">
                                        Role
                                    </th>
                                    <th className="px-4 py-2 border border-gray-700">
                                        Verified
                                    </th>
                                    <th className="px-4 py-2 border border-gray-700">
                                        Joined
                                    </th>
                                    <th className="px-4 py-2 border border-gray-700">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data?.map((user, i) => (
                                    <tr
                                        key={i + 1}
                                        className="hover:bg-gray-800"
                                    >
                                        <td className="px-4 py-2 border border-gray-700">
                                            {i + 1}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-700">
                                            {user.firstname} {user.lastname}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-700">
                                            @{user.username}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-700">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-700">
                                            <span
                                                className={`px-2 py-1 text-xs rounded ${
                                                    user.roleId === 1
                                                        ? "bg-red-500/20 text-red-400"
                                                        : "bg-blue-500/20 text-blue-400"
                                                }`}
                                            >
                                                {user.role?.name ||
                                                    (user.roleId === 1
                                                        ? "Admin"
                                                        : "User")}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border border-gray-700 text-center">
                                            {user.verified_at && (
                                                <BadgeCheckIcon className="inline text-blue-500" />
                                            )}
                                            {user.banned_at && (
                                                <Ban className="inline text-red-500 ml-1" />
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-700">
                                            <TimeAgo date={user.created_at} />
                                        </td>
                                        <td className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-700">
                                            <Button
                                                size={"icon"}
                                                variant={"outline"}
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "dashboard.users.show",
                                                        user.id
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
                                                        "dashboard.users.edit",
                                                        user.id
                                                    )}
                                                >
                                                    <Edit />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant={"destructive"}
                                                size={"icon"}
                                                onClick={() =>
                                                    handleDelete(user.id)
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
                </div>
            </DashboardLayout>
        </>
    );
};

export default UsersDashboard;
