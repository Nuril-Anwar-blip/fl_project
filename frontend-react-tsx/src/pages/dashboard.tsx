/**
 * Dokumentasi: Halaman Dashboard
 * Deskripsi: Halaman utama setelah login yang menampilkan ringkasan statistik dan data kesehatan.
 * Ketergantungan: `layouts/app-layout`, `lucide-react` (icons), `components/ui/*`.
 * Fitur:
 * - Tampilan berbeda untuk Admin/Dokter (Statistik Global) dan Pasien (Kondisi Kesehatan Pribadi).
 * - Admin: Grafik akurasi model, total pasien, ronde aktif dengan visual premium.
 * - Pasien: Glukosa terakhir, tekanan darah, tingkat risiko, dan riwayat kesehatan dengan card interaktif.
 */
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Activity, Users, FileText, TrendingUp, AlertCircle, Heart, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
        // Patient
        latest_glucose?: number;
        latest_bp?: string;
        risk_level?: string;
        records?: RecordItem[];
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    const roleParam = new URLSearchParams(window.location.search).get('role')?.toLowerCase();
    const role = roleParam === 'admin' || roleParam === 'doctor' || roleParam === 'patient' ? roleParam : 'patient';
    const isAdminOrDoctor = role === 'admin' || role === 'doctor';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-4">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back!</h1>
                        <p className="text-muted-foreground mt-1">
                            Here is an overview of {isAdminOrDoctor ? 'the system performance' : 'your health status'} today.
                        </p>
                    </div>
                    {role === 'admin' && (
                        <Button className="shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-0">
                            <Activity className="mr-2 h-4 w-4" /> Start New Round
                        </Button>
                    )}
                    {role === 'patient' && (
                        <Button className="shadow-lg">
                            <FileText className="mr-2 h-4 w-4" /> Log New Health Record
                        </Button>
                    )}
                </div>

                {isAdminOrDoctor ? (
                    // Admin/Doctor View
                    <div className="space-y-6">
                        {/* Stats Grid */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                                    <Users className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.total_patients || 0}</div>
                                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Round</CardTitle>
                                    <Activity className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">#{stats.active_round || 0}</div>
                                    <p className="text-xs text-muted-foreground">Training in progress</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-purple-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-purple-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.accuracy || 0}%</div>
                                    <p className="text-xs text-muted-foreground">+1.2% improvement</p>
                                </CardContent>
                            </Card>
                            {role === 'admin' && (
                                <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-900/10">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Admin Actions</CardTitle>
                                        <UserPlus className="h-4 w-4 text-orange-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <a href="/admin/create-new" className="text-sm font-bold text-orange-600 hover:underline">
                                            Create New Admin &rarr;
                                        </a>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Main Charts Area */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4 shadow-sm">
                                <CardHeader>
                                    <CardTitle>Global Model Performance</CardTitle>
                                    <CardDescription>Accuracy trends over the last 10 rounds.</CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <div className="h-[300px] w-full relative">
                                        <PlaceholderPattern className="absolute inset-0 size-full stroke-primary/20 opacity-20" />
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                            [Interactive Line Chart Component Placeholder]
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="col-span-3 shadow-sm">
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest system logs and updates.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center">
                                                <span className="relative flex h-2 w-2 mr-4">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                                </span>
                                                <div className="ml-4 space-y-1">
                                                    <p className="text-sm font-medium leading-none">New model aggregated</p>
                                                    <p className="text-sm text-muted-foreground">Round #{100 + i} completed successfully.</p>
                                                </div>
                                                <div className="ml-auto font-medium text-xs text-muted-foreground">{i}h ago</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    // Patient View
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="shadow-sm border-l-4 border-l-indigo-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Latest Glucose</CardTitle>
                                    <Activity className="h-4 w-4 text-indigo-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.latest_glucose ? `${stats.latest_glucose} mg/dL` : 'No Data'}</div>
                                    <p className="text-xs text-muted-foreground">Last recorded yesterday</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-sm border-l-4 border-l-pink-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
                                    <AlertCircle className="h-4 w-4 text-pink-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.risk_level || 'Unknown'}</div>
                                    <p className="text-xs text-muted-foreground">Based on latest prediction</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-sm border-l-4 border-l-emerald-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                                    <Heart className="h-4 w-4 text-emerald-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.latest_bp || '-/-'}</div>
                                    <p className="text-xs text-muted-foreground">Systolic/Diastolic</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4 shadow-sm">
                                <CardHeader>
                                    <CardTitle>Health Trends</CardTitle>
                                    <CardDescription>Your glucose levels over time.</CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <div className="h-[300px] w-full relative">
                                        <PlaceholderPattern className="absolute inset-0 size-full stroke-indigo-500/20 opacity-20" />
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                            [Personal Health Chart Placeholder]
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-3 shadow-sm">
                                <CardHeader>
                                    <CardTitle>History</CardTitle>
                                    <CardDescription>Recent health records.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {stats.records && stats.records.length > 0 ? (
                                        <div className="space-y-4">
                                            {stats.records.slice(0, 5).map((record) => (
                                                <div key={record.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                                    <div className="space-y-0.5">
                                                        <p className="text-sm font-medium leading-none">{new Date(record.record_date).toLocaleDateString()}</p>
                                                        <p className="text-xs text-muted-foreground">Glucose: {record.fasting_glucose}</p>
                                                    </div>
                                                    <div className="text-sm font-mono text-muted-foreground">
                                                        {record.systolic_bp}/{record.diastolic_bp}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground text-sm">No records found.</div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
