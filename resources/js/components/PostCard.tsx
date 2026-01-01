import React, { lazy, Suspense, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
    BadgeCheckIcon,
    Bookmark,
    Heart,
    Loader2,
    MessageCircleMore,
    MoreHorizontal,
    Send,
    SendHorizonal,
    Smile,
} from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { EmojiClickData, EmojiStyle, Theme } from "emoji-picker-react";
import { useTheme } from "./ThemeProvider";
import { ShowMore } from "@re-dev/react-truncate";
import Loading from "./ui/loading";
import TimeAgo from "react-timeago";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { router, usePage, Link } from "@inertiajs/react";
import { ILikes, IPosts } from "@/types";
import { useSweetAlert } from "@/hooks/use-sweetAlert";
import { useToast } from "@/hooks/use-toast";
import usePosts from "@/hooks/features/use-posts";
import useLikes from "@/hooks/features/use-likes";
import useSavedPosts from "@/hooks/features/use-saved-posts";
import CommentDialog from "./CommentDialog";
const EmojiPicker = lazy(() => import("emoji-picker-react"));

export default function PostCard() {
    const { auth } = usePage().props;
    const { modal } = useSweetAlert();
    const toast = useToast();
    const { data, isLoading, refetch: refetchPost } = usePosts();
    const { data: dataLikes, refetch } = useLikes();
    const { data: savedPosts, refetch: refetchSaved } = useSavedPosts();

    const userLiked: ILikes[] = dataLikes?.data?.filter(
        (like: ILikes) => like.userId === auth?.user?.id
    );

    const isPostSaved = (postId: number) => {
        return savedPosts?.some((post: IPosts) => post.id === postId);
    };

    const handleClickSave = (postId: number) => {
        if (!auth?.user) {
            modal({
                title: "You're Not Logged In",
                text: "Please Login to save posts!",
                icon: "warning",
                confirmButtonText: "Login",
                denyButtonText: "Register",
                showCancelButton: true,
                preConfirm() {
                    router.visit("login");
                },
            });
            return;
        }

        router.post(
            route("post.save", postId),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    refetchSaved();
                },
            }
        );
    };

    const handleClickReport = () => {
        !auth.user &&
            modal({
                title: "Your Not Logged In",
                text: "Please Login for report this post !",
                confirmButtonText: "Login",
                showDenyButton: true,
                denyButtonText: "Register",
                showCancelButton: true,
                preConfirm() {
                    router.visit("login", {
                        onStart: () =>
                            toast("Please wait, redirect to page login !", {
                                type: "info",
                                autoClose: 800,
                            }),
                    });
                },
            });
    };

    const handleClickUnfollow = () => {
        !auth.user &&
            modal({
                title: "Are you sure ?",
                text: "Please confirm if sure to unfollow !",
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "Unfollow",
                showCancelButton: true,
            });
    };

    const handleClickLike = (postId?: number, commentId?: number) => {
        if (!auth.user) {
            modal({
                title: "Your Not Logged In",
                text: "Please Login for like this post !",
                confirmButtonText: "Login",
                showDenyButton: true,
                denyButtonText: "Register",
                showCancelButton: true,
                preConfirm() {
                    router.visit("login", {
                        onStart: () =>
                            toast("Please wait, redirect to page login !", {
                                type: "info",
                                autoClose: 800,
                            }),
                    });
                },
            });
        } else {
            if (postId) {
                router.post(
                    route("like.post", postId),
                    {},
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            refetch();
                            refetchPost();
                        },
                    }
                );
            }
            if (commentId) {
                router.post(
                    route("like.comment", commentId),
                    {},
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            refetch();
                            refetchPost();
                        },
                    }
                );
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 px-5 mt-2">
            {isLoading ? (
                <Loader2 className="animate-spin" />
            ) : data ? (
                data.data?.map((post: IPosts) => (
                    <Card
                        key={post.id}
                        className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
                    >
                        <CardHeader className="flex-row items-center justify-start gap-2">
                            <Avatar>
                                <AvatarImage
                                    src={post.users.profile_picture}
                                    alt={post.users.profile_picture}
                                />
                            </Avatar>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Link
                                    href={route(
                                        "user.profile",
                                        post.users.username
                                    )}
                                    className="hover:underline"
                                >
                                    {post.users.username}
                                </Link>
                                {post.users.verified_at && (
                                    <BadgeCheckIcon className="text-blue-500 size-5" />
                                )}
                            </CardTitle>
                            <Separator
                                orientation="vertical"
                                className="h-5 w-0.5"
                            />
                            <span className="text-xs">
                                <TimeAgo date={post.created_at} />
                            </span>
                            <div className="ms-auto">
                                <Dialog>
                                    <DialogOverlay className="bg-black/[.01] z-10" />
                                    <DialogTrigger>
                                        <MoreHorizontal />
                                    </DialogTrigger>
                                    <DialogContent className="w-80">
                                        <DialogTitle className="sr-only">
                                            More Menu
                                        </DialogTitle>
                                        {post.userId !== auth.user?.id && (
                                            <>
                                                <DialogClose asChild>
                                                    <Button
                                                        variant={"destructive"}
                                                        onClick={
                                                            handleClickReport
                                                        }
                                                    >
                                                        Report
                                                    </Button>
                                                </DialogClose>
                                                {auth.user && (
                                                    <DialogClose asChild>
                                                        <Button
                                                            variant={
                                                                "destructive"
                                                            }
                                                            onClick={
                                                                handleClickUnfollow
                                                            }
                                                        >
                                                            Unfollow
                                                        </Button>
                                                    </DialogClose>
                                                )}
                                                <Separator />
                                            </>
                                        )}
                                        <Button variant={"ghost"}>
                                            Add to Bookmark
                                        </Button>
                                        <Button variant={"ghost"}>
                                            Open Post
                                        </Button>
                                        <Button variant={"ghost"}>
                                            Share to...
                                        </Button>
                                        <Button variant={"ghost"}>
                                            Copy Link
                                        </Button>
                                        <Separator />
                                        <DialogClose asChild>
                                            <Button variant={"ghost"}>
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <DialogClose hidden={true} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent className="p-2 space-y-2">
                            <AspectRatio ratio={1 / 1} className="-mt-4">
                                <img
                                    src={
                                        post.image.startsWith("http")
                                            ? post.image
                                            : `/storage/${post.image}`
                                    }
                                    alt={post.image}
                                    className="h-full rounded-md"
                                />
                            </AspectRatio>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Button
                                        variant={"ghost"}
                                        onClick={() => handleClickLike(post.id)}
                                        size={"icon"}
                                    >
                                        <Heart
                                            className={
                                                userLiked?.find(
                                                    (like: ILikes) =>
                                                        like.entityId ===
                                                        post.id
                                                )?.entityId === post.id
                                                    ? "text-red-500"
                                                    : ""
                                            }
                                        />
                                    </Button>
                                    <CommentDialog
                                        post={post}
                                        trigger={
                                            <Button
                                                variant={"ghost"}
                                                size={"icon"}
                                            >
                                                <MessageCircleMore />
                                            </Button>
                                        }
                                    />
                                    <Button variant={"ghost"} size={"icon"}>
                                        <Send />
                                    </Button>
                                </div>
                                <Button
                                    variant={"ghost"}
                                    size={"icon"}
                                    onClick={() => handleClickSave(post.id)}
                                >
                                    <Bookmark
                                        className={
                                            isPostSaved(post.id)
                                                ? "fill-current"
                                                : ""
                                        }
                                    />
                                </Button>
                            </div>
                            <Button
                                variant={"link"}
                                className="h-full p-0 text-foreground"
                            >
                                {post.likes_count} Likes
                            </Button>
                            <CardDescription className="w-full space-y-2">
                                <Link
                                    href={route(
                                        "user.profile",
                                        post.users.username
                                    )}
                                >
                                    <Button
                                        variant={"link"}
                                        className="h-full p-0 w-max text-foreground"
                                    >
                                        {post.users.username}
                                        {post.users.verified_at && (
                                            <BadgeCheckIcon className="text-blue-500 size-5" />
                                        )}
                                    </Button>
                                </Link>
                                <ShowMore
                                    lines={2}
                                    id="showmore"
                                    more={"See more"}
                                    less={"Less more"}
                                >
                                    {post.description}
                                </ShowMore>
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex flex-col p-2 pt-0 gap-2">
                            {/* Preview: Show first 2 comments */}
                            {post.comments && post.comments.length > 0 && (
                                <div className="w-full space-y-2">
                                    {post.comments
                                        .slice(0, 2)
                                        .map((comment) => (
                                            <div
                                                key={comment.id}
                                                className="flex gap-2 text-sm"
                                            >
                                                <Link
                                                    href={route(
                                                        "user.profile",
                                                        comment.users?.username
                                                    )}
                                                    className="font-semibold hover:underline"
                                                >
                                                    {comment.users?.username}
                                                </Link>
                                                <span className="text-muted-foreground line-clamp-1">
                                                    {comment.description}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* See all comments dialog */}
                            {post.comments_count > 2 && (
                                <CommentDialog
                                    post={post}
                                    trigger={
                                        <Button
                                            variant={"link"}
                                            className="p-0 text-muted-foreground self-start"
                                        >
                                            View all {post.comments_count}{" "}
                                            comments
                                        </Button>
                                    }
                                />
                            )}

                            <CommentInput postId={post.id} />
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <span>Post Not Found</span>
            )}
        </div>
    );
}

const CommentInput = ({ postId }: { postId: number }) => {
    const [comment, setComment] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { theme } = useTheme();
    const { refetch: refetchPost } = usePosts();

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setComment((prevComment) => prevComment + emojiData.emoji);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim().length === 0 || isSubmitting) return;

        setIsSubmitting(true);
        router.post(
            route("comment.store", postId),
            { description: comment },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setComment("");
                    refetchPost();
                },
                onFinish: () => setIsSubmitting(false),
            }
        );
    };

    return (
        <div className="flex flex-col w-full">
            <form className="relative flex gap-2" onSubmit={handleSubmit}>
                <Textarea
                    placeholder="Write your comment..."
                    className="resize-none scrollbar-w-1 scrollbar scrollbar-thumb-foreground scrollbar-thumb-rounded-lg"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex flex-col">
                    <Button
                        variant={"ghost"}
                        type="submit"
                        className="p-0"
                        size={"icon"}
                        disabled={comment.trim().length === 0 || isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <SendHorizonal />
                        )}
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"ghost"} className="p-0">
                                <Smile />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-max p-0 z-[1]">
                            <Suspense fallback={<Loading />}>
                                <EmojiPicker
                                    theme={
                                        theme === "dark"
                                            ? Theme.DARK
                                            : Theme.LIGHT
                                    }
                                    onEmojiClick={handleEmojiClick}
                                    emojiStyle={EmojiStyle.APPLE}
                                />
                            </Suspense>
                        </PopoverContent>
                    </Popover>
                </div>
            </form>
        </div>
    );
};
