/**
 * Dokumentasi: Halaman Login
 * Deskripsi: Halaman formulir untuk pengguna masuk ke dalam sistem.
 * Ketergantungan: `components/ui/*` (Input, Button, Label, dll), `layouts/auth-layout`, `routes/login`.
 * Fitur:
 * - Input email dan password dengan ikon.
 * - Checkbox "Remember me".
 * - Link ke halaman lupa password dan registrasi.
 * - Validasi form dan penanganan error login.
 */
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form } from '@/components/form';
import { Mail, Lock, LogIn } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout
            title="Welcome back"
            description="Enter your credentials to access your account"
        >
            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="name@example.com"
                                        className="pl-9"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <a
                                            href={request().url}
                                            className="text-sm text-primary hover:underline hover:text-primary/80"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </a>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="pl-9"
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember" className="font-normal cursor-pointer">Remember me for 30 days</Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full font-bold shadow-lg"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing ? <Spinner className="mr-2" /> : <LogIn className="mr-2 h-4 w-4" />}
                                Sign In
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{' '}
                                <a
                                    href={register().url}
                                    className="font-medium text-primary hover:underline"
                                    tabIndex={5}
                                >
                                    Create an account
                                </a>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 rounded-md bg-green-50 p-4 text-center text-sm font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
