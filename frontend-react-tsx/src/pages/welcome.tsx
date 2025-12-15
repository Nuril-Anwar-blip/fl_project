/**
 * Dokumentasi: Halaman Welcome
 * Deskripsi: Halaman pendaratan (landing page) utama aplikasi yang menampilkan pengenalan sistem, fitur utama, dan navigasi ke login/register.
 * Ketergantungan: `lucide-react` (ikon), `components/ui/button`.
 * Fitur:
 * - Menampilkan hero section dengan animasi.
 * - Menjelaskan cara kerja Federated Learning.
 * - Navigasi ke Halaman Login dan Register.
 */
import { useEffect } from 'react';
import { Activity, Shield, Share2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    useEffect(() => {
        document.title = 'Welcome | FL Health Monitor';
    }, []);
    return (
        <>
            <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">

                {/* Navbar */}
                <header className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <Activity className="size-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">FL Health Monitor</span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <a href="/login">
                            <Button variant="ghost" className="font-medium">Log in</Button>
                        </a>
                        <a href="/register">
                            <Button className="font-medium shadow-lg hover:shadow-xl transition-all">Register Patient</Button>
                        </a>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex flex-col pt-10 lg:pt-20">
                    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                System Operational v1.0
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                                Privacy-First <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">AI Healthcare</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                                Detecting early signs of diabetes using Federated Learning.
                                We train models across devices without ever moving your sensitive health data.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <a href="/register">
                                    <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </a>
                                <a href="#how-it-works">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full backdrop-blur-sm">
                                        Learn More
                                    </Button>
                                </a>
                            </div>
                        </div>

                        {/* Abstract Visual / Illustration */}
                        <div className="relative lg:h-[600px] w-full flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-200">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-full blur-[100px] opacity-70 animate-pulse"></div>

                            <div className="relative z-10 grid grid-cols-2 gap-6 p-8 bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-500">
                                <div className="space-y-4 p-6 bg-card rounded-2xl border shadow-sm">
                                    <Shield className="h-10 w-10 text-primary" />
                                    <h3 className="text-lg font-bold">Data Privacy</h3>
                                    <p className="text-sm text-muted-foreground">Your data stays on your device. Only model updates are shared.</p>
                                </div>
                                <div className="space-y-4 p-6 bg-card rounded-2xl border shadow-sm mt-12">
                                    <Share2 className="h-10 w-10 text-purple-600" />
                                    <h3 className="text-lg font-bold">Collaborative AI</h3>
                                    <p className="text-sm text-muted-foreground">Hospitals collaborate to build smarter models without data sharing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section id="how-it-works" className="py-20 bg-muted/30 mt-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold mb-4">How Federated Learning Works</h2>
                            <p className="text-muted-foreground text-lg">
                                A decentralized approach to machine learning that protects your privacy while advancing medical research.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Activity,
                                    title: "1. Local Training",
                                    desc: "The AI model is sent to your device and trains on your local health data."
                                },
                                {
                                    icon: Share2,
                                    title: "2. Update Sharing",
                                    desc: "Only the mathematical improvements (weights) are sent back to our secure server."
                                },
                                {
                                    icon: Shield,
                                    title: "3. Global Aggregation",
                                    desc: "The server combines updates from thousands of patients to create a smarter global model."
                                }
                            ].map((feature, i) => (
                                <div key={i} className="bg-card p-8 rounded-2xl border hover:border-primary/50 transition-colors shadow-sm cursor-default">
                                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="py-12 border-t mt-auto">
                    <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
                        <p>© 2024 Federated Learning Health Monitor. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
