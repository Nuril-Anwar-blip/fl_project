import AppLayout from '@/layouts/app-layout';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@/components/form';

export default function PatientsCreate() {
    useEffect(() => {
        document.title = 'Add Patient';
    }, []);

    return (
        <AppLayout breadcrumbs={[
            { title: 'Patients', href: '/patients' },
            { title: 'Add Patient', href: '/patients/create' }
        ]}>
            <div className="p-4 max-w-2xl mx-auto">
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h1 className="text-2xl font-bold mb-6">Register New Patient</h1>

                    <Form action="/patients" method="post" resetOnSuccess={['password']} className="space-y-4">
                        {({ processing, errors }) => (
                        <>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="origin_hospital">Origin Hospital (Optional)</Label>
                            <Input
                                id="origin_hospital"
                                name="origin_hospital"
                                placeholder="e.g. City General Hospital"
                            />
                            <p className="text-xs text-muted-foreground">Specify if the patient is transferred from another facility.</p>
                            {errors.origin_hospital && <p className="text-sm text-red-500">{errors.origin_hospital}</p>}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <a href="/patients" className="px-4 py-2 text-sm font-medium hover:underline">
                                Cancel
                            </a>
                            <Button type="submit" disabled={processing}>
                                Register Patient
                            </Button>
                        </div>
                        </>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
