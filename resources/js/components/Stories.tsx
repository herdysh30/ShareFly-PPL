import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import { usePage } from "@inertiajs/react";
import { useState, useRef } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import StoriesComp from "react-insta-stories";
import moment from "moment";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { IStories } from "@/types";
import useStories from "@/hooks/features/use-stories";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export default function Stories() {
    const { auth } = usePage().props;
    const toast = useToast();
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(-1);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const [viewedStories, setViewedStories] = useState<
        Record<number, Set<number>>
    >({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: dataStories, isLoading, refetch } = useStories();

    const authUserStories =
        dataStories?.data?.filter(
            (story: IStories) => story.userId === auth?.user?.id
        ) || [];
    const hasAuthUserStories = authUserStories.length > 0;

    const allStories = [
        ...(hasAuthUserStories ? authUserStories : []),
        ...(dataStories?.data?.filter(
            (story: IStories) => story.userId !== auth?.user?.id
        ) || []),
    ];

    const groupedStories = allStories.reduce((acc, story) => {
        if (!acc[story.userId]) {
            acc[story.userId] = [];
        }
        acc[story.userId].push(story);
        return acc;
    }, {} as Record<number, IStories[]>);

    // Build userIds array preserving insertion order (auth user first)
    const userIds: number[] = [];
    allStories.forEach((story) => {
        if (!userIds.includes(story.userId)) {
            userIds.push(story.userId);
        }
    });

    const handleStoryEnd = () => {
        const currentUserId = userIds[selectedStoryIndex];
        setViewedStories((prev) => {
            const newViewedStories = { ...prev };
            if (!newViewedStories[currentUserId]) {
                newViewedStories[currentUserId] = new Set();
            }
            groupedStories[currentUserId].forEach((story: IStories) => {
                newViewedStories[currentUserId].add(story.id);
            });
            return newViewedStories;
        });

        const nextIndex = (selectedStoryIndex + 1) % userIds.length;
        setSelectedStoryIndex(nextIndex);
        if (nextIndex === 0) {
            setOpenDialog(false);
        }
    };

    const currentUserId = userIds[selectedStoryIndex];
    const currentUserStories = groupedStories[currentUserId] || [];

    const handleAuthUserClick = () => {
        if (hasAuthUserStories) {
            setSelectedStoryIndex(0);
            setOpenDialog(true);
        } else if (auth?.user) {
            setOpenCreateDialog(true);
        }
    };

    const handleStoryClick = (userId: number) => {
        const actualIndex = userIds.indexOf(userId);
        if (actualIndex !== -1) {
            setSelectedStoryIndex(actualIndex);
            setOpenDialog(true);
        }
    };

    const isAllStoriesViewed = (userId: number) => {
        const userStories = groupedStories[userId] || [];
        const viewedUserStories = viewedStories[userId] || new Set();
        return userStories.every((story: IStories) =>
            viewedUserStories.has(story.id)
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateStory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fileInputRef.current?.files?.[0]) {
            toast("Please select an image", { type: "error" });
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", fileInputRef.current.files[0]);

        try {
            await axios.post("/stories", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast("Story created successfully!", { type: "success" });
            setOpenCreateDialog(false);
            setCaption("");
            setImagePreview(null);
            refetch();
        } catch (error) {
            toast("Failed to create story", { type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex px-5 py-2 gap-2 border-b sticky top-0 bg-background/50 backdrop-blur-2xl z-[2]">
            <Carousel
                className="w-full"
                opts={{
                    slidesToScroll: 10,
                }}
            >
                <CarouselContent>
                    <div
                        className={`flex flex-col items-center gap-1 ml-5 cursor-pointer relative`}
                        onClick={handleAuthUserClick}
                    >
                        <div className="relative">
                            <Avatar
                                className={`md:w-14 md:h-14 w-10 h-10 ${
                                    hasAuthUserStories
                                        ? "border-[3px] border-blue-500"
                                        : ""
                                }`}
                            >
                                <AvatarImage
                                    src={auth?.user?.profile_picture}
                                />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                                    {auth?.user?.username
                                        ?.slice(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {auth?.user && !hasAuthUserStories && (
                                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                                    <Plus className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                        <span className="text-xs">
                            {auth?.user?.username?.slice(0, 9)}...
                        </span>
                    </div>
                    {isLoading ? (
                        <Loader2 className="mx-auto animate-spin" />
                    ) : userIds ? (
                        userIds.map((userId, index) => {
                            // Always skip auth user - they have separate avatar
                            if (userId === auth?.user?.id) return null;
                            const story: IStories = groupedStories[userId][0];
                            const isViewed = isAllStoriesViewed(userId);
                            return (
                                <CarouselItem
                                    key={story.id}
                                    className="basis-1/6 sm:basis-[12%] md:basis-1/6 lg:basis-[10%] pl-0 xl:basis-1/12 ml-3 flex flex-col items-center cursor-pointer gap-1"
                                    onClick={() => handleStoryClick(userId)}
                                >
                                    <Avatar
                                        className={`border-[3px] md:w-14 md:h-14 w-10 h-10 ${
                                            isViewed
                                                ? "border-gray-300"
                                                : "border-blue-500"
                                        }`}
                                    >
                                        <AvatarImage
                                            src={story?.users?.profile_picture}
                                        />
                                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                                            {story?.users?.username
                                                ?.slice(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs">
                                        {story?.users?.username.slice(0, 9) +
                                            "..."}
                                    </span>
                                </CarouselItem>
                            );
                        })
                    ) : null}
                </CarouselContent>
                <CarouselPrevious
                    className="-left-3 opacity-80 disabled:hidden"
                    variant={"secondary"}
                />
                <CarouselNext
                    className="-right-3 opacity-80 disabled:hidden"
                    variant={"secondary"}
                />
            </Carousel>

            {/* View Stories Dialog */}
            {currentUserStories.length > 0 && (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent
                        className="justify-center p-0 -mt-5 bg-transparent border-none max-w-max"
                        close="hidden"
                    >
                        <DialogClose asChild>
                            <Button
                                variant={"secondary"}
                                size={"icon"}
                                className="ms-auto"
                            >
                                <X />
                            </Button>
                        </DialogClose>
                        <StoriesComp
                            key={currentUserId}
                            stories={currentUserStories.map((s: IStories) => ({
                                url: s?.image ?? "",
                                header: {
                                    heading: s?.users?.username ?? "",
                                    subheading:
                                        moment(s?.created_at).fromNow() ?? "",
                                    profileImage:
                                        s?.users?.profile_picture ?? "",
                                },
                            }))}
                            isPaused={false}
                            onAllStoriesEnd={handleStoryEnd}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {/* Create Story Dialog */}
            <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create Story</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateStory} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="image">Image</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="cursor-pointer"
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="caption">Caption</Label>
                            <Input
                                id="caption"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Write a caption..."
                                maxLength={255}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpenCreateDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin mr-2" />
                                ) : null}
                                Share Story
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
