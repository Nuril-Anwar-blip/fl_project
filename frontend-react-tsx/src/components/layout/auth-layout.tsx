/**
 * Dokumentasi: Auth Layout
 * Deskripsi: Layout wrapper untuk halaman autentikasi (Login, Register, dll).
 * Ketergantungan: `AuthSplitLayout` (sebelumnya Simple).
 * Fitur:
 * - Menyediakan judul (title) dan deskripsi halaman.
 * - Menggunakan template layout split (Gambar Brand + Form).
 */
import AuthLayoutTemplate from '@/components/layout/auth/auth-split-layout';

export default function AuthLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
