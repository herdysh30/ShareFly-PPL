import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { BadgeCheckIcon, Indent, LogIn } from 'lucide-react'
import { Link, usePage } from '@inertiajs/react'
import { useHomeContext } from '@/pages/Home'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import BioEdit from './BioEdit'

const PeopleYouMayKnow = () => {
    const { auth } = usePage().props
    const { canLogin, canRegister } = useHomeContext()

    return (
        <div className="sticky h-screen px-2">
            {
                auth.user ? (
                    <>
                        <div className="flex gap-2 p-2 border rounded-lg">
                            <PhotoProvider maskOpacity={.75}>
                                <PhotoView src={auth.user.profile_picture}>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={auth.user.profile_picture} alt={auth.user.profile_picture} />
                                    </Avatar>
                                </PhotoView>
                            </PhotoProvider>
                            <div className="flex flex-col w-full">
                                <div className="flex gap-2">
                                    <Button variant={'link'} className="justify-start h-full p-0 text-foreground">{auth.user.username}</Button>
                                    {
                                        auth.user.verified_at && (
                                            <BadgeCheckIcon className="text-blue-500 size-5" />
                                        )
                                    }
                                </div>
                                <BioEdit />
                            </div>
                        </div>
                        {/* <div className="flex flex-col px-2 mt-4 border rounded-lg">
                            <div className="flex items-center justify-between px-2">
                                <span className="text-sm">
                                    People you may know
                                </span>
                                <Button variant={'link'} className="p-0 text-xs font-light">
                                    See more <ArrowRightToLine />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center justify-between gap-2 p-2">
                                        <Avatar className="relative cursor-pointer group/image">
                                            <AvatarImage src={`https://picsum.photos/50?random=${i + 20}`} alt="avatar" />
                                        </Avatar>
                                        <div className="flex flex-col w-full h-full">
                                            <div className="flex gap-2">
                                                <Button variant={'link'} className="justify-start h-full p-0 text-sm text-foreground">{faker.person.firstName()}</Button>
                                                <BadgeCheckIcon className="text-blue-500 size-5" />
                                            </div>
                                            <Button variant={'link'} className="text-[10px] p-0 text-wrap h-full underline-offset-2 text-start text-slate-500 line-clamp-2">Following by {faker.person.firstName()} + 7 lainnya</Button>
                                        </div>
                                        <Button variant={'default'} className="px-2 py-1 text-xs">
                                            + Follow
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </>
                ) : (
                    <div className="flex flex-col gap-2 p-2 border rounded-lg">
                        <p className="text-sm">
                            Start your journey, and look for people you like. Then, follow to communicate with each other!
                        </p>
                        <div className="flex gap-2">
                            {
                                canLogin && (
                                    <>
                                        <Button variant={'default'} asChild>
                                            <Link href={route('login')} className="w-full">
                                                <LogIn />
                                                Login
                                            </Link>
                                        </Button>
                                        {
                                            canRegister && (
                                                <Button variant={'default'} asChild>
                                                    <Link href={route('register')} className="w-full">
                                                        <Indent />
                                                        Register
                                                    </Link>
                                                </Button>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
            <p className="mt-4 text-xs text-center text-muted-foreground/50">Copyright &copy; ShareFly from Cookie-Army</p>
        </div>
    )
}

export default PeopleYouMayKnow