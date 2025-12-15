/**
 * Dokumentasi: Halaman Register
 * Deskripsi: Halaman pendaftaran pasien baru.
 * Ketergantungan: `components/ui/*`, `layouts/auth-layout`, `routes/register`.
 * Fitur:
 * - Formulir data diri lengkap (Nama, Email, Tanggal Lahir, Gender, Alamat, No HP).
 * - Data kontak darurat.
 * - Password dan konfirmasi password.
 * - Link login jika sudah punya akun.
 */
import { login } from '@/routes';
import { store } from '@/routes/register';
import { useEffect } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { Form } from '@/components/form';
import { Separator } from '@/components/ui/separator';
import { User, MapPin, HeartPulse, Lock, UserPlus } from 'lucide-react';

export default function Register() {
    useEffect(() => {
        document.title = 'Register';
    }, []);

    return (
        <AuthLayout
            title="Create your account"
            description="Join our federated learning health network today."
        >
            <Form {...store.form()} resetOnSuccess={['password', 'password_confirmation']} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary font-medium">
                                    <User className="h-4 w-4" />
                                    <h3>Personal Information</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="John Doe"
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="username"
                                            name="email"
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="date_of_birth">Date of Birth</Label>
                                            <Input
                                                id="date_of_birth"
                                                type="date"
                                                required
                                                name="date_of_birth"
                                            />
                                            <InputError message={errors.date_of_birth} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="gender">Gender</Label>
                                            <select
                                                id="gender"
                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                required
                                                name="gender"
                                            >
                                                <option value="" disabled>Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <InputError message={errors.gender} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Contact Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary font-medium">
                                    <MapPin className="h-4 w-4" />
                                    <h3>Contact Details</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            type="text"
                                            name="address"
                                            placeholder="123 Main St"
                                            required
                                        />
                                        <InputError message={errors.address} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone_number">Phone Number</Label>
                                        <Input
                                            id="phone_number"
                                            type="tel"
                                            name="phone_number"
                                            placeholder="+1234567890"
                                            required
                                        />
                                        <InputError message={errors.phone_number} />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Emergency Contact */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-destructive font-medium">
                                    <HeartPulse className="h-4 w-4" />
                                    <h3>Emergency Contact</h3>
                                </div>
                                <div className="grid gap-4 p-4 border rounded-xl bg-muted/20">
                                    <div className="grid gap-2">
                                        <Label htmlFor="emergency_contact_name">Contact Name</Label>
                                        <Input
                                            id="emergency_contact_name"
                                            type="text"
                                            name="emergency_contact_name"
                                            placeholder="Jane Doe"
                                            required
                                        />
                                        <InputError message={errors.emergency_contact_name} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
                                            <Input
                                                id="emergency_contact_phone"
                                                type="tel"
                                                name="emergency_contact_phone"
                                                placeholder="+1234567890"
                                                required
                                            />
                                            <InputError message={errors.emergency_contact_phone} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="emergency_contact_relation">Relation</Label>
                                            <Input
                                                id="emergency_contact_relation"
                                                type="text"
                                                name="emergency_contact_relation"
                                                placeholder="Spouse, Parent..."
                                                required
                                            />
                                            <InputError message={errors.emergency_contact_relation} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Security */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary font-medium">
                                    <Lock className="h-4 w-4" />
                                    <h3>Security</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="********"
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="********"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full font-bold shadow-lg mt-4 h-12" tabIndex={5} disabled={processing}>
                                {processing ? <Spinner className="mr-2" /> : <UserPlus className="mr-2 h-4 w-4" />}
                                Register Patient
                            </Button>
                        </div>

                        <div className="text-center text-sm">
                            Already have an account?{' '}
                            <a href={login().url} className="font-medium text-primary hover:underline" tabIndex={6}>
                                Log in
                            </a>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
