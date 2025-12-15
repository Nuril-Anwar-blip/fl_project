/**
 * Dokumentasi: Hook useInitials
 * Deskripsi: Menghasilkan inisial dari nama lengkap (depan + belakang).
 * Model Pemakaian (React TS murni):
 * - const getInitials = useInitials(); getInitials("Nama Lengkap") => "NL".
 * Catatan: Bebas ketergantungan framework; kompatibel penuh.
 */
import { useCallback } from 'react';

export function useInitials() {
    return useCallback((fullName: string): string => {
        const names = fullName.trim().split(' ');

        if (names.length === 0) return '';
        if (names.length === 1) return names[0].charAt(0).toUpperCase();

        const firstInitial = names[0].charAt(0);
        const lastInitial = names[names.length - 1].charAt(0);

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);
}
