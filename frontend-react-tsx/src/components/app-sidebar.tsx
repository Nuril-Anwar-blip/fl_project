/**
 * Dokumentasi: Sidebar Aplikasi
 * Fungsi: Menyediakan navigasi utama aplikasi, footer, dan informasi pengguna.
 * Ketergantungan: Komponen Sidebar, `@inertiajs/react` untuk link logo.
 */
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Activity, BookOpen, Folder, LayoutGrid, User, Users, Settings, FileText, Heart } from 'lucide-react';
import AppLogo from './app-logo';
import { useEffect, useState } from 'react';

// --- Role-Based Navigation Config ---

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard (Admin)',
        href: '/dashboard?role=admin',
        icon: LayoutGrid,
    },
    {
        title: 'User Management',
        href: '/users',
        icon: Users,
    },
    {
        title: 'System Settings',
        href: '/settings/system',
        icon: Settings,
    },
    {
        title: 'Federated Monitor',
        href: '/federated/monitor',
        icon: Activity,
    },
];

const doctorNavItems: NavItem[] = [
    {
        title: 'Dashboard (Doctor)',
        href: '/dashboard?role=doctor',
        icon: LayoutGrid,
    },
    {
        title: 'Patient Records',
        href: '/patients',
        icon: Users,
    },
    {
        title: 'Rounds',
        href: '/federated/monitor',
        icon: Activity,
    },
];

const patientNavItems: NavItem[] = [
    {
        title: 'My Health',
        href: '/dashboard?role=patient',
        icon: Heart,
    },
    {
        title: 'History',
        href: '/history',
        icon: FileText,
    },
    {
        title: 'Profile',
        href: '/profile',
        icon: User,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const [role, setRole] = useState<'admin' | 'doctor' | 'patient'>('patient');

    useEffect(() => {
        // Simple role detection from URL for demo purposes
        const roleParam = new URLSearchParams(window.location.search).get('role')?.toLowerCase();
        if (roleParam === 'admin' || roleParam === 'doctor' || roleParam === 'patient') {
            setRole(roleParam);
        }
    }, []);

    const getNavItems = () => {
        switch (role) {
            case 'admin': return adminNavItems;
            case 'doctor': return doctorNavItems;
            case 'patient': return patientNavItems;
            default: return patientNavItems;
        }
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href={`/dashboard?role=${role}`}>
                                <AppLogo />
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
