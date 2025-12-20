import { Activity, TrendingUp, Users, UserPlus, HardDrive } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

interface AdminDashboardProps {
    stats: {
        total_patients?: number;
        active_round?: number;
        accuracy?: number;
        server_status?: 'healthy' | 'warning' | 'down';
    };
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-600 bg-gradient-to-br from-white to-blue-50 dark:from-gray-950 dark:to-blue-950/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">Total Patients</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total_patients || 0}</div>
                        <p className="text-xs text-blue-600/80 font-medium">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-600 bg-gradient-to-br from-white to-purple-50 dark:from-gray-950 dark:to-purple-950/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400">Active Round</CardTitle>
                        <Activity className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">#{stats.active_round || 0}</div>
                        <p className="text-xs text-purple-600/80 font-medium">Training phase in progress</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-600 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-950 dark:to-emerald-950/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Model Accuracy</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.accuracy || 0}%</div>
                        <p className="text-xs text-emerald-600/80 font-medium">+2.5% global improvement</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500 bg-gradient-to-br from-white to-amber-50 dark:from-gray-950 dark:to-amber-950/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400">System Status</CardTitle>
                        <HardDrive className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 capitalize">{stats.server_status || 'Healthy'}</div>
                        <p className="text-xs text-amber-600/80 font-medium">All services operational</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Action Area */}
                <Card className="col-span-4 shadow-md border-0 ring-1 ring-gray-200 dark:ring-gray-800">
                    <CardHeader>
                        <CardTitle>Federated Learning Overview</CardTitle>
                        <CardDescription>Global model performance over the last 15 rounds.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[350px] w-full relative rounded-md bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center overflow-hidden group">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-blue-500/20 opacity-30 group-hover:opacity-40 transition-opacity" />
                            <div className="z-10 text-center">
                                <TrendingUp className="mx-auto h-12 w-12 text-blue-500 mb-2 opacity-50" />
                                <span className="text-muted-foreground font-medium">Interactive Chart Component Loading...</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions & Activity */}
                <Card className="col-span-3 shadow-md border-0 ring-1 ring-gray-200 dark:ring-gray-800 flex flex-col">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Manage platform resources.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1">
                        <Button className="w-full justify-start h-auto py-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-100 shadow-sm hover:shadow group transition-all">
                            <div className="bg-blue-100 p-2 rounded-full mr-3 group-hover:bg-blue-200 transition-colors">
                                <UserPlus className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold">Create Administrator</h3>
                                <p className="text-xs text-muted-foreground">Add new staff permissions</p>
                            </div>
                        </Button>

                        <Button className="w-full justify-start h-auto py-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-100 shadow-sm hover:shadow group transition-all">
                            <div className="bg-purple-100 p-2 rounded-full mr-3 group-hover:bg-purple-200 transition-colors">
                                <Activity className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold">Trigger New Round</h3>
                                <p className="text-xs text-muted-foreground">Force start aggregation cycle</p>
                            </div>
                        </Button>

                        <div className="pt-4 mt-2 border-t">
                            <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider text-[10px]">Recent Activity</h4>
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-start">
                                        <div className="relative flex h-2 w-2 mr-3 mt-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">System Backup Completed</p>
                                            <p className="text-xs text-muted-foreground">Automated snapshot captured at 0{i}:00 AM.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
