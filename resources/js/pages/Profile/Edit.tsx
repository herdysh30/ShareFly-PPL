import { Head, usePage, useForm } from "@inertiajs/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/layouts/AppLayout";
import { HomeContext } from "@/pages/Home";
import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    BadgeCheckIcon,
    Grid3X3,
    Bookmark,
    Heart,
    Pencil,
    Camera,
    Loader2,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import ProfilePostCard from "@/components/ProfilePostCard";
import { IPosts } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/imageUploader";

interface EditProps {
    mustVerifyEmail: boolean;
    status?: string;
    posts?: IPosts[];
    savedPosts?: IPosts[];
    likedPosts?: IPosts[];
}

export default function Edit({
    mustVerifyEmail,
    status,
    posts,
    savedPosts,
    likedPosts,
}: EditProps) {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState<"posts" | "saved" | "liked">(
        "posts"
    );
    const [isOpen, setIsOpen] = useState(false);

    const contextData = {
        canLogin: false,
        canRegister: false,
        hasHome: true,
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: auth.user.firstname,
        lastname: auth.user.lastname,
        username: auth.user.username,
        email: auth.user.email,
        bio: auth.user.bio || "",
        no_telepon: auth.user.no_telepon || "",
        profile_picture: null as File | null,
        profile_background: null as File | null,
        _method: "PATCH",
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewBg, setPreviewBg] = useState<string | null>(null);

    // Cropping State
    const [croppingTarget, setCroppingTarget] = useState<{
        field: "profile_picture" | "profile_background";
        aspect: number;
        circular: boolean;
    } | null>(null);

    // States for ImageUploader
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);

    const handleCropOpen = (
        field: "profile_picture" | "profile_background",
        aspect: number,
        circular: boolean
    ) => {
        setUploadImage(null);
        setUploadPreview(null);
        setCroppingTarget({ field, aspect, circular });
    };

    const handleCropSave = (file: File) => {
        if (!croppingTarget) return;

        setData(croppingTarget.field, file);

        // Update preview
        const reader = new FileReader();
        reader.onloadend = () => {
            if (croppingTarget.field === "profile_picture") {
                setPreviewImage(reader.result as string);
            } else {
                setPreviewBg(reader.result as string);
            }
        };
        reader.readAsDataURL(file);

        setCroppingTarget(null); // Close cropper
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("profile.update"), {
            onSuccess: () => {
                setIsOpen(false);
                reset("profile_picture", "profile_background");
                setPreviewImage(null);
                setPreviewBg(null);
            },
        });
    };

    return (
        <HomeContext.Provider value={contextData}>
            <Head title="Profile" />
            <AppLayout>
                <div className="flex flex-col items-center gap-4 p-4">
                    {/* Back Button */}
                    <div className="w-full max-w-2xl flex justify-between items-center">
                        <Button variant="ghost" asChild>
                            <Link href={route("home")}>
                                <ArrowLeft className="mr-2 size-4" />
                                Back to Home
                            </Link>
                        </Button>

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Pencil className="size-4" />
                                    Edit Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] h-[90vh] flex flex-col p-0">
                                <DialogHeader className="p-6 pb-2">
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click
                                        save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex-1 overflow-y-auto px-6 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
                                    <form
                                        onSubmit={submit}
                                        className="space-y-6 pb-6"
                                    >
                                        {/* Profile Picture Upload */}
                                        <div className="flex flex-col items-center gap-2">
                                            <Avatar className="w-24 h-24 border-4 border-background cursor-pointer relative group">
                                                <AvatarImage
                                                    src={
                                                        previewImage ||
                                                        auth.user
                                                            .profile_picture
                                                    }
                                                />
                                                <div
                                                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                                                    onClick={() =>
                                                        handleCropOpen(
                                                            "profile_picture",
                                                            1,
                                                            true
                                                        )
                                                    }
                                                >
                                                    <Camera className="text-white size-6" />
                                                </div>
                                            </Avatar>
                                            <span className="text-xs text-muted-foreground">
                                                Click to change picture
                                            </span>
                                            {errors.profile_picture && (
                                                <span className="text-xs text-red-500">
                                                    {errors.profile_picture}
                                                </span>
                                            )}
                                        </div>

                                        {/* Background Upload */}
                                        <div className="space-y-2">
                                            <Label>Profile Background</Label>
                                            <div className="relative h-32 rounded-md border bg-muted flex items-center justify-center overflow-hidden group cursor-pointer">
                                                {(previewBg ||
                                                    auth.user
                                                        .profile_background) && (
                                                    <img
                                                        src={
                                                            previewBg
                                                                ? previewBg
                                                                : auth.user.profile_background?.startsWith(
                                                                      "http"
                                                                  )
                                                                ? auth.user
                                                                      .profile_background
                                                                : `/storage/${auth.user.profile_background}`
                                                        }
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                                <div
                                                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() =>
                                                        handleCropOpen(
                                                            "profile_background",
                                                            3 / 1,
                                                            false
                                                        )
                                                    }
                                                >
                                                    <Camera className="text-white size-6" />
                                                    <span className="text-white ml-2 text-sm">
                                                        Change Background
                                                    </span>
                                                </div>
                                            </div>
                                            {errors.profile_background && (
                                                <span className="text-xs text-red-500">
                                                    {errors.profile_background}
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstname">
                                                    First name
                                                </Label>
                                                <Input
                                                    id="firstname"
                                                    value={data.firstname}
                                                    onChange={(e) =>
                                                        setData(
                                                            "firstname",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.firstname && (
                                                    <span className="text-xs text-red-500">
                                                        {errors.firstname}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastname">
                                                    Last name
                                                </Label>
                                                <Input
                                                    id="lastname"
                                                    value={data.lastname}
                                                    onChange={(e) =>
                                                        setData(
                                                            "lastname",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.lastname && (
                                                    <span className="text-xs text-red-500">
                                                        {errors.lastname}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="username">
                                                Username
                                            </Label>
                                            <Input
                                                id="username"
                                                value={data.username}
                                                onChange={(e) =>
                                                    setData(
                                                        "username",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.username && (
                                                <span className="text-xs text-red-500">
                                                    {errors.username}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                disabled
                                                className="bg-muted"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="no_telepon">
                                                Phone Number
                                            </Label>
                                            <Input
                                                id="no_telepon"
                                                value={data.no_telepon}
                                                onChange={(e) =>
                                                    setData(
                                                        "no_telepon",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.no_telepon && (
                                                <span className="text-xs text-red-500">
                                                    {errors.no_telepon}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                value={data.bio}
                                                onChange={(e) =>
                                                    setData(
                                                        "bio",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.bio && (
                                                <span className="text-xs text-red-500">
                                                    {errors.bio}
                                                </span>
                                            )}
                                        </div>

                                        <DialogFooter className="sticky bottom-0 bg-background pt-2">
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                            >
                                                {processing && (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                )}
                                                Save changes
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Cropping Dialog */}
                        <Dialog
                            open={!!croppingTarget}
                            onOpenChange={(open) => {
                                if (!open) setCroppingTarget(null);
                            }}
                        >
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Crop{" "}
                                        {croppingTarget?.field ===
                                        "profile_picture"
                                            ? "Profile Picture"
                                            : "Background"}
                                    </DialogTitle>
                                    <DialogDescription>
                                        Adjust the image to fit the frame.
                                    </DialogDescription>
                                </DialogHeader>
                                {croppingTarget && (
                                    <ImageUploader
                                        image={uploadImage}
                                        setImage={setUploadImage}
                                        previewImage={uploadPreview}
                                        setPreviewImage={setUploadPreview}
                                        setData={handleCropSave}
                                        aspect={croppingTarget.aspect}
                                        isCircular={croppingTarget.circular}
                                    />
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Profile Card */}
                    <Card className="w-full max-w-2xl">
                        {/* Profile Background */}
                        <div className="relative h-32 bg-gradient-to-r from-primary to-primary/50 rounded-t-lg">
                            {auth.user?.profile_background && (
                                <img
                                    src={
                                        auth.user.profile_background.startsWith(
                                            "http"
                                        )
                                            ? auth.user.profile_background
                                            : `/storage/${auth.user.profile_background}`
                                    }
                                    alt="Profile Background"
                                    className="object-cover w-full h-full rounded-t-lg"
                                />
                            )}
                        </div>

                        <CardHeader className="relative -mt-16 text-center">
                            <Avatar className="w-24 h-24 mx-auto border-4 border-background">
                                <AvatarImage
                                    src={auth.user?.profile_picture}
                                    alt={auth.user?.username}
                                />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                    {auth.user?.username
                                        ?.slice(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle className="flex items-center justify-center gap-2 mt-2">
                                {auth.user?.firstname} {auth.user?.lastname}
                                {auth.user?.verified_at && (
                                    <BadgeCheckIcon className="text-blue-500 size-5" />
                                )}
                            </CardTitle>
                            <CardDescription>
                                @{auth.user?.username}
                            </CardDescription>
                        </CardHeader>

                        <Separator />

                        <CardContent className="p-6 space-y-4">
                            {/* Bio */}
                            <div>
                                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                                    Bio
                                </h3>
                                <p className="text-sm">
                                    {auth.user?.bio || "No bio yet"}
                                </p>
                            </div>

                            {/* Info */}
                            <div className="grid gap-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="size-4 text-muted-foreground" />
                                    <span>{auth.user?.email}</span>
                                </div>
                                {auth.user?.no_telepon && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="size-4 text-muted-foreground" />
                                        <span>{auth.user.no_telepon}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="size-4 text-muted-foreground" />
                                    <span>
                                        Joined{" "}
                                        {new Date(
                                            auth.user?.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Role Badge */}
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                                    {auth.user?.role?.name || "User"}
                                </span>
                            </div>

                            {mustVerifyEmail &&
                                !auth.user?.email_verified_at && (
                                    <div className="p-3 text-sm text-yellow-600 rounded-lg bg-yellow-100/50">
                                        Your email address is unverified.
                                    </div>
                                )}

                            {status === "profile-updated" && (
                                <div className="p-3 text-sm text-green-600 rounded-lg bg-green-100/50">
                                    Profile updated successfully.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Tab Navigation */}
                    <div className="w-full max-w-2xl flex gap-4 border-b">
                        <Button
                            variant="ghost"
                            className={`flex items-center gap-2 rounded-none border-b-2 ${
                                activeTab === "posts"
                                    ? "border-primary"
                                    : "border-transparent"
                            }`}
                            onClick={() => setActiveTab("posts")}
                        >
                            <Grid3X3 className="size-4" />
                            My Posts ({posts?.length || 0})
                        </Button>
                        <Button
                            variant="ghost"
                            className={`flex items-center gap-2 rounded-none border-b-2 ${
                                activeTab === "saved"
                                    ? "border-primary"
                                    : "border-transparent"
                            }`}
                            onClick={() => setActiveTab("saved")}
                        >
                            <Bookmark className="size-4" />
                            Saved ({savedPosts?.length || 0})
                        </Button>
                        <Button
                            variant="ghost"
                            className={`flex items-center gap-2 rounded-none border-b-2 ${
                                activeTab === "liked"
                                    ? "border-primary"
                                    : "border-transparent"
                            }`}
                            onClick={() => setActiveTab("liked")}
                        >
                            <Heart className="size-4" />
                            Liked ({likedPosts?.length || 0})
                        </Button>
                    </div>

                    {/* Posts Content */}
                    <div className="w-full max-w-2xl">
                        {activeTab === "posts" && (
                            <ProfilePostCard posts={posts || []} />
                        )}
                        {activeTab === "saved" && (
                            <ProfilePostCard posts={savedPosts || []} />
                        )}
                        {activeTab === "liked" && (
                            <ProfilePostCard posts={likedPosts || []} />
                        )}
                    </div>
                </div>
            </AppLayout>
        </HomeContext.Provider>
    );
}
