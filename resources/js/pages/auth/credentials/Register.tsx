import ProviderIcon from '@/components/icon/ProviderIcon';
import { ModeToggleClick } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Loading from '@/components/ui/loading';
import { useToast } from '@/hooks/use-toast';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Socialstream as SocialstreamType } from '@/types';
import Socialstream from '@/components/Socialstream';
import Logo from '@/components/icon/Logo';

export default function Register({ socialstream, errors: { socialstream: socialstreamErrors } }: { socialstream: SocialstreamType, errors: { socialstream?: string } }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const toast = useToast()

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            onSuccess: () => toast('Register Success!', { type: 'success' }),
            onError: () => toast('Register Failed!', { type: 'error' }),
            onStart: () => toast('Wait a minute for Register up!', { type: 'info' })
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="flex items-center justify-center h-screen p-5">
                <Card className="relative w-full lg:w-2/5">
                    <Button variant={'ghost'} className="absolute top-2 left-2" asChild>
                        <Link href={route('home')}>
                            <ArrowLeftCircle />
                            Back
                        </Link>
                    </Button>
                    <div className="absolute top-2 right-2">
                        <ModeToggleClick />
                    </div>
                    <CardContent className="py-5 rounded-lg bg-accent/30">
                        <div className="flex items-center justify-around gap-10 mt-8">
                            <div className="grid gap-4">
                                <CardHeader className="p-0">
                                    <CardTitle className="text-xl">Register</CardTitle>
                                    <CardDescription className="text-xs">
                                        Receive Personalized Recomendations and Offers Just For You
                                    </CardDescription>
                                </CardHeader>
                                {socialstream.show && socialstream.providers.length > 0 && (
                                    <Socialstream error={socialstreamErrors} providers={socialstream.providers} />
                                )}
                                <span className="text-xs text-center">or</span>
                                <form className='grid gap-4' onSubmit={submit}>
                                    <div className="grid gap-2">
                                        <Label htmlFor='username'>Username</Label>
                                        <Input
                                            id='username'
                                            type='text'
                                            name='username'
                                            autoComplete='username'
                                            placeholder='Input Your Username...'
                                            autoFocus
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value)}
                                        />
                                        <span className='text-xs text-destructive'>{errors.username}</span>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor='email'>Email</Label>
                                        <Input
                                            id='email'
                                            type='email'
                                            name='email'
                                            autoComplete='email'
                                            placeholder='Input Your Email Address...'
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <span className='text-xs text-destructive'>{errors.email}</span>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor='password'>Password</Label>
                                        <Input
                                            id='password'
                                            type='password'
                                            name='password'
                                            placeholder='Input Your Password...'
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <span className='text-xs text-destructive'>{errors.password}</span>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor='password_confirmation'>Password Confirmation</Label>
                                        <Input
                                            id='password_confirmation'
                                            type='password'
                                            name='password_confirmation'
                                            placeholder='Input again Your Password...'
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <span className='text-xs text-destructive'>{errors.password_confirmation}</span>
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        {
                                            processing ? (
                                                <Loading />
                                            ) : 'Register'
                                        }
                                    </Button>
                                </form>
                                <p className="text-xs text-center">
                                    Have an account?
                                    <Button variant={'link'} className="p-0 ms-2">
                                        <Link href={route('login')}>Login</Link>
                                    </Button>
                                </p>
                            </div>
                            <Link href={route('home')} className='max-md:hidden'>
                            <Logo className='w-40' />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
