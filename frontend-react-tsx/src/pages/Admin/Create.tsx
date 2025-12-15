/**
 * Dokumentasi: Halaman Buat Admin
 * Deskripsi: Halaman formulir untuk membuat akun admin baru.
 * Ketergantungan: `layouts/app-layout`, `components/ui/*`.
 * Fitur:
 * - Form pembuatan admin dengan validasi.
 * - Tampilan card terpusat.
 * - Tombol Batal dan Simpan yang jelas.
 */
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, UserPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AdminCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/create-new');
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Create Admin', href: '/admin/create-new' }
        ]}>
            <Head title="Create Admin" />
            <div className="p-4 max-w-2xl mx-auto">
                <div className="mb-4">
                    <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                    </Link>
                </div>

                <Card className="shadow-lg border-t-4 border-t-primary">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <UserPlus className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Create New Admin</CardTitle>
                                <CardDescription>Add a new administrator to manage the system.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <Separator />
                    <form onSubmit={submit}>
                        <CardContent className="space-y-4 pt-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Admin Name"
                                    required
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@example.com"
                                    required
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3 bg-muted/20 border-t p-6">
                            <Button variant="outline" asChild>
                                <Link href="/dashboard">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing} className="px-8 font-bold">
                                {processing ? 'Saving...' : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> Create Admin
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
