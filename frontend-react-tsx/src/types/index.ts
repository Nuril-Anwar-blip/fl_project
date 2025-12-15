// Basic types for standalone React app
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at?: string | null;
}

export interface Auth {
    user: User;
}

export interface SharedData {
    auth: Auth;
    sidebarOpen?: boolean;
    [key: string]: unknown;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}
