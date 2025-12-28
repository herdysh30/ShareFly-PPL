import { CSSProperties, useState } from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { ActivitySquare, AlertTriangle, Book, FolderClock, Home, LogOut, MenuSquare, MessageSquare, Search, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { ModeToggleSwitch } from "./ModeToggle"
import { Link, usePage } from "@inertiajs/react"
import { PopoverClose } from "@radix-ui/react-popover"
import Logo from "./icon/Logo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import CreatePost from "./CreatePost"
import { useHomeContext } from "@/pages/Home"

const SidebarNav = () => {
    const { auth } = usePage().props
    const { url } = usePage()
    const { canLogin, canRegister } = useHomeContext()

    return (
        <SidebarProvider className="hidden w-max md:block" style={{
            '--sidebar-width': '10rem'
        } as CSSProperties}>
            <Sidebar className="hidden md:flex" collapsible="icon">
                <TooltipProvider>
                    <SidebarHeader>
                        <SidebarMenu>
                            <Tooltip>
                                <TooltipTrigger>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="hover:bg-accent" asChild>
                                            <Link href={route('home')}>
                                                <Logo />
                                                <h2 className="text-xl font-bold ps-1 font-fira-code">ShareFly</h2>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5} className="text-black dark:text-white bg-secondary">
                                    <span>ShareFly</span>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="hover:bg-accent" asChild>
                                            <SidebarTrigger className="justify-start">
                                                <span>Collapse</span>
                                            </SidebarTrigger>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5} className="text-black dark:text-white bg-secondary">
                                    <span>Collapse</span>
                                </TooltipContent>
                            </Tooltip>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent className="justify-center">
                        <SidebarMenu className="gap-2 px-2">
                            <Tooltip>
                                <TooltipTrigger>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className={`hover:bg-accent ${url === '/' && 'bg-accent border-x border-primary'}`} asChild>
                                            <a href='/'>
                                                <Home />
                                                <span>Home</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5} className="text-black dark:text-white bg-secondary">
                                    <span>Home</span>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="hover:bg-accent" asChild>
                                            <a href='#'>
                                                <Search />
                                                <span>Search</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5} className="text-black dark:text-white bg-secondary">
                                    <span>Search</span>
                                </TooltipContent>
                            </Tooltip>
                            {
                                auth.user && (
                                    <CreatePost />
                                )
                            }
                            <Tooltip>
                                <TooltipTrigger>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className={`hover:bg-accent ${url === '/anime' && 'bg-accent border-x border-primary'}`} asChild>
                                            <a href='/anime'>
                                                <FolderClock />
                                                <span>Movie Anime</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5} className="text-black dark:text-white bg-secondary">
                                    <span>Movie Anime</span>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className={`hover:bg-accent ${url === '/book' && 'bg-accent border-x border-primary'}`} asChild>
                                            <a href='/book'>
                                                <Book />
                                                <span>Read Book</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5} className="text-black dark:text-white bg-secondary">
                                    <span>Read Book</span>
                                </TooltipContent>
                            </Tooltip>
                            {
                                auth.user && (
                                    <>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton className={`hover:bg-accent ${url === '/chat' && 'bg-accent border-x border-primary'}`} asChild>
                                                        <Link href={route('chat')}>
                                                            <MessageSquare />
                                                            <span>Messages</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" sideOffset={5} className="text-black dark:text-white bg-secondary">
                                                <span>Messages</span>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton className="hover:bg-accent" asChild>
                                                        <a href='#'>
                                                            <User />
                                                            <span>Profile</span>
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" sideOffset={5} className="text-black dark:text-white bg-secondary">
                                                <span>Profile</span>
                                            </TooltipContent>
                                        </Tooltip>
                                    </>
                                )
                            }
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter className="mb-2">
                        <SidebarMenu>
                            <Tooltip>
                                <TooltipTrigger>
                                    <SidebarMenuItem>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <SidebarMenuButton className="hover:bg-accent">
                                                    <MenuSquare />
                                                    <span>Menu</span>
                                                </SidebarMenuButton>
                                            </PopoverTrigger>

                                            <PopoverContent side="right" align="end" className="flex flex-col gap-2 w-max">
                                                {
                                                    auth.user.roleId === 1 && (
                                                        <Button variant={'ghost'} className="justify-start" asChild>
                                                            <Link href={route('dashboard')}>
                                                                <ActivitySquare />
                                                                <span>Dashboard</span>
                                                            </Link>
                                                        </Button>
                                                    )
                                                }
                                                {
                                                    auth.user && (
                                                        <Button variant={'ghost'} className="justify-start">
                                                            <ActivitySquare />
                                                            <span>Your Activity</span>
                                                        </Button>
                                                    )
                                                }
                                                <Button variant={'ghost'} className="justify-start">
                                                    <AlertTriangle />
                                                    <span>Report issue</span>
                                                </Button>
                                                <Button variant={'ghost'} asChild>
                                                    <Label htmlFor="switchMode" className='justify-start cursor-pointer'>
                                                        Theme Mode
                                                        <ModeToggleSwitch id='switchMode' />
                                                    </Label>
                                                </Button>
                                                {
                                                    !auth.user ? (
                                                        canLogin && (
                                                            <>
                                                                <Button asChild className="lg:hidden">
                                                                    <Link href={route('login')}>Login</Link>
                                                                </Button>
                                                                {
                                                                    canRegister && (
                                                                        <Button asChild className="lg:hidden">
                                                                            <Link href={route('register')}>Register</Link>
                                                                        </Button>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    ) : (
                                                        <PopoverClose asChild>
                                                            <Button variant={'ghost'} className="justify-start" asChild>
                                                                <Link href={route('logout')} method="post">
                                                                    <LogOut />
                                                                    <span>Logout</span>
                                                                </Link>
                                                            </Button>
                                                        </PopoverClose>
                                                    )
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </SidebarMenuItem>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5} className="text-black dark:text-white bg-secondary">
                                    <span>Menu</span>
                                </TooltipContent>
                            </Tooltip>
                        </SidebarMenu>
                    </SidebarFooter>
                </TooltipProvider>
            </Sidebar>
        </SidebarProvider>
    )
}

export default SidebarNav