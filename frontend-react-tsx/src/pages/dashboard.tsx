/**
 * Dokumentasi: Halaman Dashboard
 * Deskripsi: Halaman utama yang melayani 3 role: Admin, Doctor, dan Patient.
 * Fitur:
 * - Routing internal berdasarkan query param `?role=...` (untuk demo).
 * - Menampilkan dashboard yang sesuai dengan role.
 * - Role Switcher untuk kemudahan demo.
 */
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { AdminDashboard } from './dashboard/components/admin-dashboard';
import { DoctorDashboard } from './dashboard/components/doctor-dashboard';
import { PatientDashboard } from './dashboard/components/patient-dashboard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface RecordItem {
    id: number;
    record_date: string;
    fasting_glucose: number;
    systolic_bp: number;
    diastolic_bp: number;
}

interface DashboardProps {
    stats: {
        // Admin
        total_patients?: number;
        active_round?: number;
        accuracy?: number;
        server_status?: 'healthy' | 'warning' | 'down';
        // Patient
        latest_glucose?: number;
        latest_bp?: string;
        risk_level?: string;
        records?: RecordItem[];
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    const [role, setRole] = useState<'admin' | 'doctor' | 'patient'>('patient');

    // Sync role from URL on mount
    useEffect(() => {
        const roleParam = new URLSearchParams(window.location.search).get('role')?.toLowerCase();
        if (roleParam === 'admin' || roleParam === 'doctor' || roleParam === 'patient') {
            setRole(roleParam);
        }
    }, []);

    // Update URL when role changes (for demo persistence)
    const handleRoleChange = (newRole: 'admin' | 'doctor' | 'patient') => {
        setRole(newRole);
        const url = new URL(window.location.href);
        url.searchParams.set('role', newRole);
        window.history.pushState({}, '', url);
        // Force reload to update Sidebar (since sidebar is outside this component context in current arch)
        window.location.reload();
    };

    const getWelcomeMessage = () => {
        switch (role) {
            case 'admin': return 'System Overview';
            case 'doctor': return 'Clinical Operations';
            case 'patient': return 'My Health Status';
            default: return 'Dashboard';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-4">
                {/* Header & Role Switcher */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="uppercase text-[10px] tracking-wider">{role} View</Badge>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">{getWelcomeMessage()}</h1>
                        <p className="text-muted-foreground mt-1">
                            Welcome back! Here is what's happening today.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border">
                        <UserCheck className="h-4 w-4 text-muted-foreground ml-2" />
                        <span className="text-xs font-medium text-muted-foreground hidden sm:inline-block">Switch Role Preview:</span>
                        <Select value={role} onValueChange={handleRoleChange}>
                            <SelectTrigger className="w-[140px] h-8 bg-white dark:bg-slate-950">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="doctor">Doctor</SelectItem>
                                <SelectItem value="patient">Patient</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="min-h-[500px]">
                    {role === 'admin' && <AdminDashboard stats={stats} />}
                    {role === 'doctor' && <DoctorDashboard stats={stats} />}
                    {role === 'patient' && <PatientDashboard stats={stats} />}
                </div>
            </div>
        </AppLayout>
    );
}
