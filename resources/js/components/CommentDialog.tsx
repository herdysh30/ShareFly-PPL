import React, { lazy, Suspense, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Link, router, usePage } from "@inertiajs/react";
import TimeAgo from "react-timeago";
import { IPosts, IComments } from "@/types";
import { Loader2, SendHorizonal, Smile } from "lucide-react";
import { EmojiClickData, EmojiStyle, Theme } from "emoji-picker-react";
import { useTheme } from "./ThemeProvider";
import Loading from "./ui/loading";
import usePosts from "@/hooks/features/use-posts";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

interface CommentDialogProps {
    post: IPosts;
    trigger: React.ReactNode;
}

export default function CommentDialog({ post, trigger }: CommentDialogProps) {
    const { auth } = usePage().props;
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
            route("comment.store", post.id),
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
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] overflow-hidden flex flex-col p-0">
                <DialogTitle className="flex items-center gap-2 p-4 border-b flex-shrink-0">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={post.users?.profile_picture} />
                    </Avatar>
                    <span className="font-semibold">
                        {post.users?.username}
                    </span>
                </DialogTitle>
                <div className="flex flex-1 min-h-0">
                    {/* Image Section */}
                    <div className="w-1/2 flex items-center justify-center bg-muted/20 p-2">
                        <img
                            src={
                                post.image?.startsWith("http")
                                    ? post.image
                                    : `/storage/${post.image}`
                            }
                            alt={post.description}
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                    </div>
                    {/* Comments Section */}
                    <div className="w-1/2 flex flex-col border-l min-h-0">
                        {/* Post description */}
                        <div className="p-4 border-b flex-shrink-0">
                            <div className="flex gap-2">
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarImage
                                        src={post.users?.profile_picture}
                                    />
                                </Avatar>
                                <div className="min-w-0">
                                    <span className="font-semibold text-sm">
                                        {post.users?.username}
                                    </span>
                                    <p className="text-sm text-muted-foreground mt-1 break-words">
                                        {post.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Comments list */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin hover:scrollbar-thumb-muted-foreground/50 scrollbar-thumb-muted scrollbar-track-transparent">
                            {post.comments && post.comments.length > 0 ? (
                                post.comments.map((comment: IComments) => (
                                    <div
                                        key={comment.id}
                                        className="flex gap-2"
                                    >
                                        <Avatar className="w-8 h-8 flex-shrink-0">
                                            <AvatarImage
                                                src={
                                                    comment.users
                                                        ?.profile_picture
                                                }
                                            />
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <Link
                                                    href={
                                                        auth.user?.username ===
                                                        comment.users?.username
                                                            ? route(
                                                                  "profile.edit"
                                                              )
                                                            : route(
                                                                  "user.profile",
                                                                  comment.users
                                                                      ?.username
                                                              )
                                                    }
                                                    className="font-semibold text-sm hover:underline"
                                                >
                                                    {comment.users?.username}
                                                </Link>
                                                <span className="text-xs text-muted-foreground">
                                                    <TimeAgo
                                                        date={
                                                            comment.created_at
                                                        }
                                                    />
                                                </span>
                                            </div>
                                            <p className="text-sm mt-1 break-words">
                                                {comment.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground py-8">
                                    No comments yet. Be the first to comment!
                                </p>
                            )}
                        </div>
                        {/* Comment Input */}
                        <div className="p-3 border-t flex-shrink-0">
                            <form
                                className="flex gap-2 items-end"
                                onSubmit={handleSubmit}
                            >
                                <Textarea
                                    placeholder="Add a comment..."
                                    className="resize-none min-h-[40px] max-h-[80px] text-sm"
                                    rows={1}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <div className="flex gap-1">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"ghost"}
                                                size={"icon"}
                                                type="button"
                                            >
                                                <Smile className="h-5 w-5" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-max p-0 z-[100]">
                                            <Suspense fallback={<Loading />}>
                                                <EmojiPicker
                                                    theme={
                                                        theme === "dark"
                                                            ? Theme.DARK
                                                            : Theme.LIGHT
                                                    }
                                                    onEmojiClick={
                                                        handleEmojiClick
                                                    }
                                                    emojiStyle={
                                                        EmojiStyle.APPLE
                                                    }
                                                />
                                            </Suspense>
                                        </PopoverContent>
                                    </Popover>
                                    <Button
                                        variant={"ghost"}
                                        type="submit"
                                        size={"icon"}
                                        disabled={
                                            comment.trim().length === 0 ||
                                            isSubmitting
                                        }
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <SendHorizonal className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
