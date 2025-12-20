import { Activity, Users, ClipboardCheck, Stethoscope, Search, Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface DoctorDashboardProps {
    stats: {
        total_patients?: number;
        active_round?: number;
        accuracy?: number;
    };
}

export function DoctorDashboard({ stats }: DoctorDashboardProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
                        <Stethoscope className="mr-3 h-6 w-6 text-teal-600" />
                        Doctor's Overview
                    </h2>
                    <p className="text-muted-foreground mt-1">Manage your patients and monitor federated learning progress.</p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search patients..." className="pl-9 bg-slate-50 border-slate-200" />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="shadow-sm hover:shadow-md transition-all border-l-4 border-l-teal-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-teal-700 dark:text-teal-400">Assigned Patients</CardTitle>
                        <Users className="h-4 w-4 text-teal-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.total_patients || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-teal-600 font-medium">4 critical</span> requiring attention
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-all border-l-4 border-l-cyan-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-cyan-700 dark:text-cyan-400">Current Round</CardTitle>
                        <Activity className="h-4 w-4 text-cyan-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">#{stats.active_round || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Status: <Badge variant="outline" className="text-cyan-600 border-cyan-200 bg-cyan-50 ml-1">Learning</Badge>
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-all border-l-4 border-l-indigo-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-400">Pending Reviews</CardTitle>
                        <ClipboardCheck className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">7</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            New records submitted today
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Split */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Patient List Preview */}
                <Card className="col-span-4 shadow-md border-0 ring-1 ring-slate-200 dark:ring-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Patients</CardTitle>
                            <CardDescription>Patients updated recently.</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                            View All <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-100 cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                                            P{i}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Patient Name {i}</p>
                                            <p className="text-xs text-muted-foreground">ID: #8293{i}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full font-medium inline-block mb-1">
                                            High Risk
                                        </div>
                                        <p className="text-xs text-muted-foreground">Last visit: 2 days ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Appointments/Tasks */}
                <Card className="col-span-3 shadow-md border-0 ring-1 ring-slate-200 dark:ring-slate-800">
                    <CardHeader>
                        <CardTitle>Schedule & Tasks</CardTitle>
                        <CardDescription>Upcoming appointments for today.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                            <div className="bg-blue-50 text-blue-700 h-14 w-14 rounded-xl flex flex-col items-center justify-center shrink-0">
                                <span className="text-xs font-semibold uppercase">Dec</span>
                                <span className="text-lg font-bold">20</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Review Model Aggregation</h4>
                                <p className="text-xs text-muted-foreground mb-2">Check the latest federated learning round results for anomalies.</p>
                                <Badge variant="secondary" className="font-normal text-xs">10:00 AM</Badge>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                            <div className="bg-orange-50 text-orange-700 h-14 w-14 rounded-xl flex flex-col items-center justify-center shrink-0">
                                <span className="text-xs font-semibold uppercase">Dec</span>
                                <span className="text-lg font-bold">20</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Patient Consultation</h4>
                                <p className="text-xs text-muted-foreground mb-2">Follow up with Patient #82931 regarding high glucose readings.</p>
                                <Badge variant="secondary" className="font-normal text-xs">02:30 PM</Badge>
                            </div>
                        </div>

                        <Button className="w-full mt-4" variant="outline">
                            <Calendar className="mr-2 h-4 w-4" /> Full Schedule
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
