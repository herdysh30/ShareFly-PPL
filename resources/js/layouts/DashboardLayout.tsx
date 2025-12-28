import { Button } from "@/components/ui/button"
import { Link, usePage } from "@inertiajs/react"
import { ReactNode } from "react"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const { url } = usePage()

    return (
        <div className="flex bg-gray-900">
            <div className="flex flex-col w-64 h-screen p-4 text-gray-300 bg-gray-800">
                <h1 className="mb-6 text-xl font-bold text-center text-white">ShareFly</h1>
                <nav className="flex flex-col gap-4">
                    <Button variant={url === '/dashboard' ? 'default' : 'outline'}>
                        <Link href={route('dashboard')}>
                            Overview
                        </Link>
                    </Button>
                    <Button variant={url === '/dashboard/posts' ? 'default' : 'outline'} asChild>
                        <Link href={route('dashboard.posts')}>Posts</Link>
                    </Button>
                    <Button variant={url === '/dashboard/users' ? 'default' : 'outline'} asChild>
                        <Link href={route('dashboard.users')}>Users</Link>
                    </Button>
                    <Button variant={'outline'}>Report</Button>
                    <Button variant={'outline'}>Message</Button>
                    <Button variant={'outline'}>Statistic</Button>
                    <Button variant={'outline'}>Setting</Button>
                </nav>
            </div>
            {children}
        </div>
    )
}

export default DashboardLayout