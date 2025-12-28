import React from 'react'
import { Button } from './ui/button'
import { Link, usePage } from '@inertiajs/react'
import { ActivitySquare, Book, FolderClock, Home, Indent, LogIn, LogOut, MenuSquare, PlusSquare, Search, User } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { ModeToggleSwitch } from './ModeToggle'

const BottomNav = () => {
    const {auth} = usePage().props
    
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/50 backdrop-blur-2xl border-t border-border p-1 md:hidden z-[1]">
            <ul className="flex justify-around">
                <li>
                    <Button variant={'ghost'} asChild>
                        <Link href="/" className="flex flex-col items-center hover:bg-transparent hover:text-muted-foreground">
                            <Home size={18} />
                            <span className="text-xs">Home</span>
                        </Link>
                    </Button>
                </li>
                <li>
                    <Button variant={'ghost'} asChild>
                        <Link href="/" className="flex flex-col items-center hover:bg-transparent hover:text-muted-foreground">
                            <Search size={18} />
                            <span className="text-xs">Search</span>
                        </Link>
                    </Button>
                </li>
                {
                    auth.user && (
                        <>
                            <li>
                                <Button variant={'ghost'} asChild>
                                    <Link href="/" className="flex flex-col items-center hover:bg-transparent hover:text-muted-foreground">
                                        <PlusSquare size={18} />
                                        <span className="text-xs">Create Post</span>
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button variant={'ghost'} asChild>
                                    <Link href="/profile" className="flex flex-col items-center hover:bg-transparent hover:text-muted-foreground">
                                        <User size={18} />
                                        <span className="text-xs">Profile</span>
                                    </Link>
                                </Button>
                            </li>
                        </>
                    )
                }
                <li>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={'ghost'} className='flex flex-col items-center mt-1 hover:bg-transparent hover:text-muted-foreground'>
                                <MenuSquare size={18} />
                                <span className="text-xs">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='space-y-2'>
                            <SheetTitle>Menu</SheetTitle>
                            <Separator />
                            <div className="flex flex-col gap-2">
                                <Button variant={'ghost'} className='justify-start w-full'>
                                    <FolderClock />
                                    <Link href="/">
                                        <span className="text-sm">Movie Anime</span>
                                    </Link>
                                </Button>
                                <Button variant={'ghost'} className='justify-start w-full'>
                                    <Book />
                                    <Link href="/">
                                        <span className="text-sm">Read Book</span>
                                    </Link>
                                </Button>
                                {
                                    auth.user && (
                                        <Button variant={'ghost'} className='justify-start w-full'>
                                            <ActivitySquare />
                                            <Link href="/">
                                                <span className="text-sm">Your Activity</span>
                                            </Link>
                                        </Button>
                                    )
                                }
                            </div>
                            <SheetTitle>Setting</SheetTitle>
                            <Separator />
                            <div className="flex flex-col gap-4">
                                <Button variant={'ghost'} className='justify-between w-full cursor-pointer' asChild>
                                    <Label htmlFor='theme'>
                                        <span>Theme Mode</span>
                                        <ModeToggleSwitch id='theme' />
                                    </Label>
                                </Button>
                                {
                                    auth.user ? (
                                        <Button variant={'ghost'} className='justify-start w-full'>
                                            <LogOut />
                                            <Link href="/logout">
                                                <span className="text-sm">Logout</span>
                                            </Link>
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button variant={'default'} className='justify-start w-full' asChild>
                                                <Link href="/login">
                                                    <LogIn />
                                                    <span className="text-sm">Login</span>
                                                </Link>
                                            </Button>
                                            <Button variant={'default'} className='justify-start w-full' asChild>
                                                <Link href="/register">
                                                    <Indent />
                                                    <span className="text-sm">Register</span>
                                                </Link>
                                            </Button>
                                        </div>
                                    )
                                }
                            </div>
                        </SheetContent>
                    </Sheet>
                </li>
            </ul>
        </nav>
  )
}

export default BottomNav