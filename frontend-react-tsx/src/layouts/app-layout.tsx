/**
 * Dokumentasi: App Layout
 * Deskripsi: Layout utama aplikasi untuk halaman yang membutuhkan autentikasi (setelah login).
 * Ketergantungan: `AppShell`, `AppSidebar`, `AppHeader`, `Breadcrumbs`.
 * Fitur:
 * - Struktur layout responsif dengan sidebar dan header.
 * - Navigasi breadcrumbs otomatis jika disediakan props.
 * - Pembungkus konten utama (children).
 *
 * Props:
 * - breadcrumbs: Array navigasi breadcrumb (opsional).
 * - children: Konten halaman.
 */

import { AppShell } from '@/components/app-shell';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';

interface Breadcrumb {
    title: string;
    href: string;
}

interface AppLayoutProps {
    breadcrumbs?: Breadcrumb[];
    children: React.ReactNode;
}

export default function AppLayout({ breadcrumbs, children }: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
                <AppHeader />
                <main className="flex-1 space-y-4 p-4 md:p-8">
                    {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
                    {children}
                </main>
            </div>
        </AppShell>
    );
}
