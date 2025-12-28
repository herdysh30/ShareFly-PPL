import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useHomeContext } from "@/pages/Home";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Dialog, DialogClose, DialogContent } from "./ui/dialog";
import StoriesComp from 'react-insta-stories'
import moment from 'moment'
import { Loader2, X } from 'lucide-react';
import { Button } from "./ui/button";
import { IStories } from "@/types";
import useStories from "@/hooks/features/use-stories";

export default function Stories() {
    const { auth } = usePage().props
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(-1)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [viewedStories, setViewedStories] = useState<Record<number, Set<number>>>({})
    const { data: dataStories, isLoading } = useStories()
    const authUserStories = dataStories?.data?.filter((story: IStories) => story.userId === auth.user.id) || []
    const hasAuthUserStories = authUserStories.length > 0
    
    const allStories = [
        ...(hasAuthUserStories ? authUserStories : []),
        ...(dataStories?.data?.filter((story: IStories) => story.userId !== auth.user.id) || [])
    ]

    const groupedStories = allStories.reduce((acc, story) => {
        if (!acc[story.userId]) {
            acc[story.userId] = []
        }
        acc[story.userId].push(story)
        return acc
    }, {} as Record<number, IStories[]>)

    const userIds = Object.keys(groupedStories).map(Number)

    useEffect(() => {
        if (selectedStoryIndex === -1 && userIds.length > 0) {
            setSelectedStoryIndex(0)
        }
    }, [selectedStoryIndex, userIds])

    const handleStoryEnd = () => {
        const currentUserId = userIds[selectedStoryIndex]
        setViewedStories(prev => {
            const newViewedStories = { ...prev }
            if (!newViewedStories[currentUserId]) {
                newViewedStories[currentUserId] = new Set()
            }
            groupedStories[currentUserId].forEach((story: IStories) => {
                newViewedStories[currentUserId].add(story.id)
            })
            return newViewedStories
        })

        const nextIndex = (selectedStoryIndex + 1) % userIds.length
        setSelectedStoryIndex(nextIndex)
        if (nextIndex === 0) {
            setOpenDialog(false)
        }
    }

    const currentUserId = userIds[selectedStoryIndex]
    const currentUserStories = groupedStories[currentUserId] || []

    const handleAuthUserClick = () => {
        if (hasAuthUserStories) {
            setSelectedStoryIndex(0)
            setOpenDialog(true)
        }
    }

    const handleStoryClick = (index: number) => {
        setSelectedStoryIndex(index)
        setOpenDialog(true)
    }

    const isAllStoriesViewed = (userId: number) => {
        const userStories = groupedStories[userId] || []
        const viewedUserStories = viewedStories[userId] || new Set()
        return userStories.every((story: IStories) => viewedUserStories.has(story.id))
    }

    return (
        <div className="flex px-5 py-2 gap-2 border-b sticky top-0 bg-background/50 backdrop-blur-2xl z-[2]">
            <Carousel className="w-full" opts={{
                slidesToScroll: 10
            }}>
                <CarouselContent>
                    <div
                        className={`flex flex-col items-center gap-1 ml-5 ${hasAuthUserStories ? 'cursor-pointer' : ''}`}
                        onClick={handleAuthUserClick}
                    >
                        <Avatar className={`md:w-14 md:h-14 w-10 h-10 ${hasAuthUserStories ? 'border-[3px] border-blue-500' : ''}`}>
                            <AvatarImage src={auth?.user?.profile_picture} />
                        </Avatar>
                        <span className="text-xs">{auth?.user?.username.slice(0, 9) + '...'}</span>
                    </div>
                    {
                        isLoading ? (
                            <Loader2 className="mx-auto animate-spin" />
                        ) : (
                            userIds ? (
                                userIds.map((userId, index) => {
                                    if (userId === auth?.user?.id && !hasAuthUserStories) return null;
                                    const story: IStories = groupedStories[userId][0]
                                    const isViewed = isAllStoriesViewed(userId)
                                    return (
                                        <CarouselItem
                                            key={story.id}
                                            className="basis-1/6 sm:basis-[12%] md:basis-1/6 lg:basis-[10%] pl-0 xl:basis-1/12 ml-3 flex flex-col items-center cursor-pointer gap-1"
                                            onClick={() => handleStoryClick(index)}
                                        >
                                            <Avatar className={`border-[3px] md:w-14 md:h-14 w-10 h-10 ${isViewed ? 'border-gray-300' : 'border-blue-500'}`}>
                                                <AvatarImage src={story?.users?.profile_picture} />
                                            </Avatar>
                                            <span className="text-xs">{story?.users?.username.slice(0, 9) + '...'}</span>
                                        </CarouselItem>
                                    )
                                })
                            ) : null
                        )
                    }
                </CarouselContent>
                <CarouselPrevious className="-left-3 opacity-80 disabled:hidden" variant={'secondary'} />
                <CarouselNext className="-right-3 opacity-80 disabled:hidden" variant={'secondary'} />
            </Carousel>

            {
                currentUserStories.length > 0 && (
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogContent className="justify-center p-0 -mt-5 bg-transparent border-none max-w-max" close="hidden">
                            <DialogClose asChild>
                                <Button variant={'secondary'} size={'icon'} className="ms-auto">
                                    <X />
                                </Button>
                            </DialogClose>
                            <StoriesComp
                                key={currentUserId}
                                stories={currentUserStories.map((s: IStories) => ({
                                    url: s?.image ?? '',
                                    header: {
                                        heading: s?.users?.username ?? '',
                                        subheading: moment(s?.created_at).fromNow() ?? '',
                                        profileImage: s?.users?.profile_picture ?? ''
                                    },
                                }))}
                                isPaused={false}
                                onAllStoriesEnd={handleStoryEnd}
                            />
                        </DialogContent>
                    </Dialog>
                )
            }
        </div>
    )
}

