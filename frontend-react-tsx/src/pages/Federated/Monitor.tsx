import AppLayout from '@/layouts/app-layout';
import { useEffect } from 'react';
import { Activity, Server, Upload, RefreshCw, CheckCircle } from 'lucide-react';

export default function FederatedMonitor() {
    useEffect(() => {
        document.title = 'FL Monitor';
    }, []);
    return (
        <AppLayout breadcrumbs={[{ title: 'Federated Learning', href: '/federated/monitor' }]}>
            <div className="p-4 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Activity className="w-6 h-6 text-primary" />
                        Federated Learning Monitor
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            System Online
                        </span>
                    </div>
                </div>

                {/* Status Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-card border p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Current Round</p>
                                <h3 className="text-2xl font-bold mt-1">#42</h3>
                            </div>
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <RefreshCw className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/10 px-2 py-1 rounded inline-block">
                            Status: Training
                        </div>
                    </div>

                    <div className="bg-card border p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                                <h3 className="text-2xl font-bold mt-1">18/25</h3>
                            </div>
                            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <Server className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <div className="w-full bg-secondary h-1.5 mt-4 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full" style={{ width: '72%' }}></div>
                        </div>
                    </div>

                    <div className="bg-card border p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Updates Received</p>
                                <h3 className="text-2xl font-bold mt-1">156</h3>
                            </div>
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                <Upload className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground">+12 in last hour</p>
                    </div>

                    <div className="bg-card border p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Global Accuracy</p>
                                <h3 className="text-2xl font-bold mt-1">87.5%</h3>
                            </div>
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-green-600 flex items-center gap-1">
                            ↑ 1.2% improvement
                        </p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-card border rounded-xl p-6 shadow-sm min-h-[400px]">
                        <h3 className="text-lg font-semibold mb-4">Training Metrics</h3>
                        <div className="flex items-center justify-center h-[300px] border-2 border-dashed rounded-lg border-muted">
                            <p className="text-muted-foreground">Real-time loss/accuracy chart would render here</p>
                        </div>
                    </div>

                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex gap-3 items-start p-3 hover:bg-muted/50 rounded-lg transition-colors text-sm">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                                    <div>
                                        <p className="font-medium">Client device_xyz uploaded update</p>
                                        <p className="text-xs text-muted-foreground">2 mins ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
