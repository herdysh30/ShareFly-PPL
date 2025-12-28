import React, { CSSProperties, useRef } from 'react'
import BottomNav from "@/components/BottomNav";
import SidebarNav from "@/components/SidebarNav";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MessageBubble from "@/components/ui/custom/chat/MessageBubble";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { faker } from "@faker-js/faker/locale/id_ID";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { MessageCircle, Mic, Phone, Plus, Search, Send, Smile, UsersRound, Video } from "lucide-react";
import { useTheme } from '@/components/ThemeProvider';
import AppLayout from '@/layouts/AppLayout';

const Chat = () => {
    const chatList = Array.from({ length: 20 })
    const containerChatRef = useRef<HTMLDivElement | null>(null)
    const { theme } = useTheme()

    return (
        <AppLayout>
            <SidebarProvider defaultOpen={false} style={{
                "--sidebar-width": "20rem"
            } as CSSProperties}>
                <div className="grid w-1/5 bg-accent/50">
                    <Label className="relative">
                        <Search className="absolute top-1 left-2" />
                        <Input type='text' placeholder="Search message..." className="focus-visible:ring-0 ps-10" />
                    </Label>
                    <div className="flex border-y-2 border-border">
                        <Button variant={'default'} className='grid w-full rounded-none h-max'>
                            <MessageCircle className="mx-auto" />
                            Chats
                        </Button>
                        <Button variant={'ghost'} className='grid w-full rounded-none h-max'>
                            <UsersRound className="mx-auto" />
                            Groups
                        </Button>
                        <Button variant={'ghost'} className='grid w-full rounded-none h-max'>
                            <Phone className="mx-auto" />
                            Calls
                        </Button>
                    </div>
                    <div className="overflow-y-auto h-[90vh] scrollbar-w-1 scrollbar scrollbar-thumb-foreground scrollbar-thumb-rounded-lg">
                        {
                            chatList.length > 0 ? (
                                chatList.map((_, i) => (
                                    <div key={i} className="grid">
                                        <div className="flex items-center gap-2 p-2">
                                            <div className="relative">
                                                <Badge className="bg-green-500 z-[1] size-3 bottom-0 left-0 absolute" />
                                                <Avatar>
                                                    <AvatarImage src={`https://picsum.photos/150?random=user-profile${i}`} />
                                                </Avatar>
                                            </div>
                                            <div className="grid">
                                                <span className="text-sm font-bold line-clamp-1">{faker.person.fullName()}</span>
                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <span className="text-xs text-muted-foreground line-clamp-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, ullam.</span>
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        <span className="text-xs text-muted-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, ullam.</span>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </div>
                                        <Separator />
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-center text-muted-foreground">No Message Found !</div>
                            )
                        }
                    </div>
                </div>
                <div className="grid w-full h-max">
                    <div className="flex px-4 py-2 justify-between items-center h-max shadow-lg z-[1]">
                        <div className="flex gap-2">
                            <Avatar>
                                <AvatarImage src="https://picsum.photos/150" alt="profile" />
                            </Avatar>
                            <div className="grid h-max">
                                <span>John</span>
                                <span className="text-xs text-muted-foreground">
                                    Online
                                    <Badge className="bg-green-500 size-2 animate-pulse ms-1" />
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex gap-2">
                                <Button>
                                    <Phone />
                                </Button>
                                <Button>
                                    <Video />
                                </Button>
                            </div>
                            <Separator orientation="vertical" className="h-10" />
                            <SidebarTrigger hidden={true} />
                        </div>
                    </div>

                    {/* chat content */}
                    <div className="grid h-[85vh] overflow-y-auto px-5 pt-2 pb-6 scrollbar-w-1 scrollbar scrollbar-thumb-foreground resize-none scrollbar-thumb-rounded-lg shadow-[inset_10px_0_15px_-3px_rgb(0_0_0_/_0.1)]" ref={containerChatRef}>
                        <div className="flex flex-col justify-end gap-2">
                            <MessageBubble
                                position="left"
                                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perspiciatis?"
                                isFirstMessage={true}
                            />
                            <MessageBubble
                                position="left"
                                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perspiciatis?"
                                isFirstMessage={false}
                            />
                            <MessageBubble
                                position="right"
                                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perspiciatis?"
                                isFirstMessage={true}
                            />
                            <MessageBubble
                                position="right"
                                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perspiciatis?"
                                isFirstMessage={false}
                            />
                        </div>
                    </div>

                    <form className="flex gap-2 items-center sticky bottom-0 px-4 py-2 bg-accent/50 shadow-[0_-10px_15px_-3px_rgb(0_0_0_/_0.1)]">
                        <Button variant={'ghost'} size={'icon'}>
                            <Plus />
                        </Button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={'ghost'} size={'icon'} className="absolute top-5 left-16 hover:bg-muted-foreground/50">
                                    <Smile />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-max p-0 z-[1]">
                                <EmojiPicker theme={theme === 'dark' ? Theme.DARK : Theme.LIGHT} />
                            </PopoverContent>
                        </Popover>
                        <Textarea placeholder='Type a message...' className="resize-none ps-12 bg-accent scrollbar-w-1 scrollbar scrollbar-thumb-foreground scrollbar-thumb-rounded-lg" />
                        <Button type="submit" size={'icon'}>
                            <Send />
                        </Button>
                        <Button variant={'ghost'} size={'icon'}>
                            <Mic />
                        </Button>
                    </form>
                </div>
                <Sidebar side="right">
                    <SidebarContent>
                        <Avatar className="mx-auto mt-5 size-40">
                            <AvatarImage src='https://picsum.photos/720' alt='image' />
                        </Avatar>
                        <Button variant={'ghost'} asChild>
                            <Label className="flex justify-between mt-4">
                                Snooze notification
                                <Switch />
                            </Label>
                        </Button>
                        <Button variant={'destructive'} className="mx-4">Blockir</Button>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </AppLayout>
    )
}

export default Chat