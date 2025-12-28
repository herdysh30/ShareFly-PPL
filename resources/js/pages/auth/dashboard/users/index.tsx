import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IMeta, User } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { BadgeCheckIcon, Ban, CheckSquare, Edit, Eye, Trash2 } from "lucide-react";
import TimeAgo from 'react-timeago'

const PostsDashboard = ({ users }: { users: IMeta<User> }) => {
  const toast = useToast()
  
  return (
    <>
      <Head title="Dashboard Post" />
      <DashboardLayout>
        <div className="flex-1 p-6 text-gray-300 bg-gray-900">
          <h2 className="mb-4 text-2xl font-bold text-white">Dashboard Users</h2>
          <table className="w-full border border-collapse border-gray-700 table-auto">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2 border border-gray-700">No</th>
                <th className="px-4 py-2 border border-gray-700">Firstname</th>
                <th className="px-4 py-2 border border-gray-700">Lastname</th>
                <th className="px-4 py-2 border border-gray-700">username</th>
                <th className="px-4 py-2 border border-gray-700">Bio</th>
                <th className="px-4 py-2 border border-gray-700">Email</th>
                <th className="px-4 py-2 border border-gray-700">Email verified</th>
                <th className="px-4 py-2 border border-gray-700">No Telepon</th>
                <th className="px-4 py-2 border border-gray-700">Verified</th>
                <th className="px-4 py-2 border border-gray-700">Profile Picture</th>
                <th className="px-4 py-2 border border-gray-700">Profile Background</th>
                <th className="px-4 py-2 border border-gray-700">Role</th>
                <th className="px-4 py-2 border border-gray-700">Banned</th>
                <th className="px-4 py-2 border border-gray-700">User Created</th>
                <th className="px-4 py-2 border border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.data?.map((user, i) => (
                <tr key={i + 1} className="hover:bg-gray-800">
                  <td className="px-4 py-2 border border-gray-700">{i + 1}</td>
                  <td className="px-4 py-2 border border-gray-700">{user.firstname}</td>
                  <td className="px-4 py-2 border border-gray-700">{user.lastname}</td>
                  <td className="px-4 py-2 border border-gray-700">{user.username}</td>
                  <td className="px-4 py-2 border border-gray-700">{user.bio}</td>
                  <td className="px-4 py-2 border border-gray-700">{user.email}</td>
                  <td className="px-4 py-2 border border-gray-700">
                    {
                      user.email_verified_at && <CheckSquare />
                    }
                  </td>
                  <td className="px-4 py-2 border border-gray-700">{user.no_telepon}</td>
                  <td className="px-4 py-2 border border-gray-700">
                    {
                      user.verified_at && <BadgeCheckIcon />
                    }
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    <img src={user.profile_picture} alt={user.profile_picture} />
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    <img src={user.profile_background} alt={user.profile_background} />
                  </td>
                  <td className="px-4 py-2 border border-gray-700">{user.role.name}</td>
                  <td className="px-4 py-2 border border-gray-700">
                    {
                      user.banned_at && <Ban />
                    }
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    <TimeAgo date={user.created_at} />
                  </td>
                  <td className="flex items-center justify-center gap-4 border border-gray-700">
                    {/* <Button size={'icon'}>
                      <Eye />
                    </Button> */}
                    <Button className="bg-foreground hover:bg-foreground/70" size={'icon'}>
                      <Edit />
                    </Button>
                    <Button variant={'destructive'} size={'icon'} asChild>
                      <Link href={route('dashboard.delete.user', user.id)} method="post" onSuccess={() => toast('delete user Success', { type: 'success' })}>
                        <Trash2 />
                      </Link>
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
