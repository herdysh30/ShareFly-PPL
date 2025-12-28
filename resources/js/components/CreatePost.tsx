import { PlusSquare } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import ImageUploader from "./imageUploader"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { FormEvent, useState } from "react"
import { useForm } from "@inertiajs/react"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import usePosts from "@/hooks/features/use-posts"

const CreatePost = () => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [step, setStep] = useState(1);
    const [image, setImage] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const toast = useToast()
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleNext = () => {
        if (step === 1 && imageUploaded) {
            setStep(2);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const { data, setData, processing, post, reset } = useForm({
        image: '',
        description: ''
    })

    const { refetch } = usePosts()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('description', data.description);

        post(route('create.post'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                refetch()
                reset('image', 'description')
                setDialogOpen(false)
                setStep(1)
                setImage(null)
                setPreviewImage(null)
                toast('Post Created !', {
                    type: 'success'
                })
            },
            onStart: () => toast('Wait for Create Post !', { type: 'info' }),
            onError: () => toast('Post Created Failed', { type: 'error' }),
        })
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
            <Tooltip>
                <TooltipTrigger>
                    <DialogTrigger asChild>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="hover:bg-accent" asChild>
                                <a href='#'>
                                    <PlusSquare />
                                    <span>Create Post</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5} className="text-black dark:text-white bg-secondary">
                    <span>Create Post</span>
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <form className="relative grid gap-4" encType="multipart/form-data" onSubmit={handleSubmit}>
                    {step === 1 && (
                        <>
                            <ImageUploader
                                onImageUploaded={() => setImageUploaded(true)}
                                image={image}
                                setImage={setImage}
                                previewImage={previewImage}
                                setPreviewImage={setPreviewImage}
                                setData={(e) => setData('image', e)}
                            />
                            {data.image && (
                                <div className="absolute right-5 bottom-5">
                                    <Button onClick={handleNext}>Next</Button>
                                </div>
                            )}
                        </>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <Textarea
                                name="description"
                                rows={4}
                                placeholder="Write something about your post..."
                                required
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <div className="flex justify-between">
                                <Button onClick={handleBack}>Back</Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Posting...' : 'Post'}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost