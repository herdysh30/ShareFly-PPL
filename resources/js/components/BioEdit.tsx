import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useForm, usePage } from '@inertiajs/react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from './ui/alert-dialog'
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'

const BioEdit = () => {
    const { auth } = usePage().props
    const { data, setData, patch } = useForm({
        bio: auth.user.bio
    })
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const toast = useToast()
    const [openBioEdit, setOpenBioEdit] = useState(false)

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current?.scrollHeight}px`
        }
    }, [textAreaRef.current?.value])

    const bioSubmit = (e: FormEvent) => {
        e.preventDefault()

        patch(route('edit.bio'), {
            onSuccess: () => {
                toast('Bio Updated !', {
                    type: 'success'
                })
                setOpenBioEdit(!openBioEdit)
            },
            onError: () => toast('Bio Field required 1 Character', {
                type: 'error'
            }),
        })
    }

    const deleteBio = () => {
        patch(route('delete.bio'), {
            onSuccess: () => {
                toast('Bio Deleted !', {
                    type: 'success'
                })
            },
            onError: (e) => toast(e.bio, {
                type: 'error'
            }),
        })
    }

    return (
        <div className="flex items-center justify-between">
            {
                auth.user.bio && (
                    <span className='flex-1 text-sm text-muted-foreground/50 line-clamp-2'>{auth.user.bio}</span>
                )
            }
            <Dialog onOpenChange={() => setOpenBioEdit(!openBioEdit)} open={openBioEdit}>
                <DialogTrigger asChild>
                    {
                        auth.user.bio ? (
                            <Button size={'icon'} variant={'ghost'} className='text-xs'>
                                <Edit />
                            </Button>
                        ) : (
                            <Button variant={'link'} className="justify-start h-full p-0 text-sm text-muted-foreground/50">Edit Your Bio</Button>
                        )
                    }
                </DialogTrigger>
                <DialogContent>
                    <form className='space-y-2' onSubmit={bioSubmit}>
                        <p>Edit your Bio Profile</p>
                        <div className="grid gap-2">
                            <Textarea className='min-h-40' ref={textAreaRef} value={data.bio} onChange={(e) => setData('bio', e.target.value)} name='bio' />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <DialogClose asChild>
                                <Button variant={'ghost'}>Cancel</Button>
                            </DialogClose>
                            <Button type='submit'>Submit</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            {
                auth.user.bio && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size={'icon'} variant={'ghost'} className='text-xs text-red-500 hover:text-red-500'>
                                <Trash2 />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure to delete your bio ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your bio
                                    , you can create new bio in your profile.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteBio} asChild>
                                    <Button variant={'destructive'}>Delete</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )
            }
        </div>
    )
}

export default BioEdit