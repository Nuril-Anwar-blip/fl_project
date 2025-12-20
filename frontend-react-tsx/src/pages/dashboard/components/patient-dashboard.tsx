import { Activity, Heart, AlertCircle, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

interface RecordItem {
    id: number;
    record_date: string;
    fasting_glucose: number;
    systolic_bp: number;
    diastolic_bp: number;
}

interface PatientDashboardProps {
    stats: {
        latest_glucose?: number;
        latest_bp?: string;
        risk_level?: string;
        records?: RecordItem[];
    };
}

export function PatientDashboard({ stats }: PatientDashboardProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Health Highlights */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="shadow-lg shadow-indigo-500/10 border-indigo-100 dark:border-indigo-900 bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-950 dark:to-indigo-950/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Activity className="w-24 h-24 text-indigo-600" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Latest Glucose</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline space-x-2">
                            <div className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">
                                {stats.latest_glucose || '--'}
                            </div>
                            <span className="text-sm text-muted-foreground font-medium">mg/dL</span>
                        </div>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                            {stats.latest_glucose && stats.latest_glucose > 100 ? (
                                <span className="flex items-center text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                                    <ArrowUp className="h-3 w-3 mr-1" /> Slightly High
                                </span>
                            ) : (
                                <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                                    <ArrowDown className="h-3 w-3 mr-1" /> Normal
                                </span>
                            )}
                            <span className="ml-auto">Yesterday</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg shadow-pink-500/10 border-pink-100 dark:border-pink-900 bg-gradient-to-br from-white to-pink-50/50 dark:from-slate-950 dark:to-pink-950/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertCircle className="w-24 h-24 text-pink-600" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-pink-600 dark:text-pink-400">Current Risk Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline space-x-2">
                            <div className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 capitalize">
                                {stats.risk_level || 'Unknown'}
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            AI Confidence Score: <span className="font-semibold text-slate-700 dark:text-slate-300">94.2%</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg shadow-emerald-500/10 border-emerald-100 dark:border-emerald-900 bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-950 dark:to-emerald-950/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Heart className="w-24 h-24 text-emerald-600" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Blood Pressure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline space-x-2">
                            <div className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">
                                {stats.latest_bp || '-/-'}
                            </div>
                            <span className="text-sm text-muted-foreground font-medium">mmHg</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Last checked: <span className="font-semibold text-slate-700 dark:text-slate-300">2 days ago</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Graph */}
                <Card className="col-span-4 shadow-sm border-0 ring-1 ring-slate-200 dark:ring-slate-800">
                    <CardHeader>
                        <CardTitle>Health Trends</CardTitle>
                        <CardDescription>Glucose levels over the last 30 days.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full relative rounded-md bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-indigo-500/20 opacity-30" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                                <Activity className="h-10 w-10 mb-2 opacity-50" />
                                <span>Personal Health Chart Placeholder</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* History List */}
                <Card className="col-span-3 shadow-sm border-0 ring-1 ring-slate-200 dark:ring-slate-800 flex flex-col">
                    <CardHeader>
                        <CardTitle>Recent History</CardTitle>
                        <CardDescription>Your latest health logs.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        {stats.records && stats.records.length > 0 ? (
                            <div className="space-y-4">
                                {stats.records.slice(0, 5).map((record) => (
                                    <div key={record.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                                <p className="text-sm font-medium leading-none">{new Date(record.record_date).toLocaleDateString()}</p>
                                            </div>
                                            <p className="text-xs text-muted-foreground pl-5">Glucose: {record.fasting_glucose}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-mono font-medium text-slate-700 dark:text-slate-300">
                                                {record.systolic_bp}/{record.diastolic_bp}
                                            </div>
                                            <Badge variant="outline" className="text-[10px] h-5">Normal</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center py-8 text-muted-foreground">
                                <Activity className="h-10 w-10 mb-2 opacity-20" />
                                <p className="text-sm">No records found recently.</p>
                                <Button variant="link" size="sm" className="mt-2">View All History</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
