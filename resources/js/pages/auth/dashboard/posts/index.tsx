import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IMeta, IPosts } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Edit, Eye, Trash2 } from "lucide-react";
import TimeAgo from 'react-timeago'

const PostsDashboard = ({ posts }: { posts: IMeta<IPosts> }) => {
  const toast = useToast()
  return (
    <>
      <Head title="Dashboard Post" />
      <DashboardLayout>
        <div className="flex-1 p-6 text-gray-300 bg-gray-900">
          <h2 className="mb-4 text-2xl font-bold text-white">Dashboard Post</h2>
          <table className="w-full border border-collapse border-gray-700 table-auto">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2 border border-gray-700">No</th>
                <th className="px-4 py-2 border border-gray-700">Image</th>
                <th className="px-4 py-2 border border-gray-700">Description</th>
                <th className="px-4 py-2 border border-gray-700">User</th>
                <th className="px-4 py-2 border border-gray-700">Post Created</th>
                <th className="px-4 py-2 border border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                posts.data?.map((post, i) => (
                  <tr key={i} className="hover:bg-gray-800">
                    <td className="px-4 py-2 border border-gray-700">{i + 1}</td>
                    <td className="px-4 py-2 border border-gray-700">
                      <img src={post.image} alt={post.image} />
                    </td>
                    <td className="px-4 py-2 border border-gray-700">{post.description}</td>
                    <td className="px-4 py-2 border border-gray-700">{post.users.firstname} {post.users.lastname}</td>
                    <td className="px-4 py-2 border border-gray-700">
                      <TimeAgo date={post.created_at} />
                    </td>
                    <td className="flex justify-center gap-4 px-4 py-2 border border-gray-700">
                      {/* <Button size={'icon'}>
                        <Eye />
                      </Button> */}
                      <Button className="bg-foreground hover:bg-foreground/70" size={'icon'}>
                        <Edit />
                      </Button>
                      <Button variant={'destructive'} size={'icon'} asChild>
                        <Link href={route('dashboard.delete.post', post.id)} method="post" onSuccess={() => toast('delete post Success', { type: 'success' })}>
                          <Trash2 />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </DashboardLayout>
    </>
  );
};

export default PostsDashboard;
