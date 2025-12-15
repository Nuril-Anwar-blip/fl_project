/**
 * Dokumentasi: Layout Aplikasi (Sidebar)
 * Fungsi: Membungkus konten halaman dengan layout sidebar dan breadcrumbs.
 */
import AppLayoutTemplate from '@/components/layout/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({
    children,
    breadcrumbs,
    ...props
}: AppLayoutProps) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
}
