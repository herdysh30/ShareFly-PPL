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
    DialogContent,
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
import useLikes from "@/hooks/features/use-likes";
import useSavedPosts from "@/hooks/features/use-saved-posts";
import CommentDialog from "./CommentDialog";
const EmojiPicker = lazy(() => import("emoji-picker-react"));

interface ProfilePostCardProps {
    posts: IPosts[];
}

export default function ProfilePostCard({ posts }: ProfilePostCardProps) {
    const { auth } = usePage().props;
    const { data: dataLikes, refetch } = useLikes();
    const { data: savedPosts, refetch: refetchSaved } = useSavedPosts();

    const userLiked: ILikes[] = dataLikes?.data?.filter(
        (like: ILikes) => like.userId === auth?.user?.id
    );

    const isPostSaved = (postId: number) => {
        return savedPosts?.some((post: IPosts) => post.id === postId);
    };

    const handleClickLike = (postId?: number) => {
        if (!auth?.user) return;
        if (postId) {
            router.post(
                route("like.post", postId),
                {},
                {
                    preserveScroll: true,
                    onSuccess: () => refetch(),
                }
            );
        }
    };

    const handleClickSave = (postId: number) => {
        if (!auth?.user) return;
        router.post(
            route("post.save", postId),
            {},
            {
                preserveScroll: true,
                onSuccess: () => refetchSaved(),
            }
        );
    };

    if (!posts || posts.length === 0) {
        return (
            <p className="text-center text-muted-foreground py-8">
                No posts yet.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {posts.map((post: IPosts) => (
                <Card key={post.id} className="w-full">
                    <CardHeader className="flex-row items-center justify-start gap-2">
                        <Avatar>
                            <AvatarImage
                                src={post.users?.profile_picture}
                                alt={post.users?.username}
                            />
                        </Avatar>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <Link
                                href={route(
                                    "user.profile",
                                    post.users?.username
                                )}
                                className="hover:underline"
                            >
                                {post.users?.username}
                            </Link>
                            {post.users?.verified_at && (
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
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2 p-0">
                        <PhotoProvider maskOpacity={0.75}>
                            <PhotoView
                                src={
                                    post.image?.startsWith("http")
                                        ? post.image
                                        : `/storage/${post.image}`
                                }
                            >
                                <AspectRatio
                                    ratio={4 / 3}
                                    className="cursor-pointer"
                                >
                                    <img
                                        src={
                                            post.image?.startsWith("http")
                                                ? post.image
                                                : `/storage/${post.image}`
                                        }
                                        alt={post.image}
                                        className="h-full rounded-md object-cover w-full"
                                    />
                                </AspectRatio>
                            </PhotoView>
                        </PhotoProvider>
                        <div className="flex items-center justify-between px-2">
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
                                                    like.entityId === post.id
                                            )?.entityId === post.id
                                                ? "text-red-500 fill-red-500"
                                                : ""
                                        }
                                    />
                                </Button>
                                <CommentDialog
                                    post={post}
                                    trigger={
                                        <Button variant={"ghost"} size={"icon"}>
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
                        <div className="px-2">
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
                                        post.users?.username
                                    )}
                                >
                                    <Button
                                        variant={"link"}
                                        className="h-full p-0 w-max text-foreground"
                                    >
                                        {post.users?.username}
                                        {post.users?.verified_at && (
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
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col p-2 pt-0 gap-2">
                        {/* Preview comments */}
                        {post.comments && post.comments.length > 0 && (
                            <div className="w-full space-y-2">
                                {post.comments.slice(0, 2).map((comment) => (
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
                        {post.comments_count > 2 && (
                            <CommentDialog
                                post={post}
                                trigger={
                                    <Button
                                        variant={"link"}
                                        className="p-0 text-muted-foreground self-start"
                                    >
                                        View all {post.comments_count} comments
                                    </Button>
                                }
                            />
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
