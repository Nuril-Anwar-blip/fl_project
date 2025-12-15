/**
 * Dokumentasi: Hook useMobileNavigation
 * Deskripsi: Utility kecil untuk mereset gaya `pointer-events` pada body saat menutup navigasi mobile.
 * Model Pemakaian (React TS murni):
 * - const closeMobileNav = useMobileNavigation(); closeMobileNav();
 * Catatan: UI-only; bergantung pada DOM `document.body`.
 */
import { useCallback } from 'react';

export function useMobileNavigation() {
    return useCallback(() => {
        // Remove pointer-events style from body...
        document.body.style.removeProperty('pointer-events');
    }, []);
}
