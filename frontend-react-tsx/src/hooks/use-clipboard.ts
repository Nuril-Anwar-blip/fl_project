/**
 * Dokumentasi: Hook useClipboard
 * Deskripsi: Menyalin teks ke clipboard dan mengembalikan nilai terakhir yang disalin.
 * Ketergantungan: Web Clipboard API.
 * Model Pemakaian (React TS murni):
 * - const [copiedText, copy] = useClipboard(); await copy("teks");
 * Catatan: Kompatibel penuh tanpa Laravel/Inertia.
 */
// Credit: https://usehooks-ts.com/
import { useCallback, useState } from 'react';

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

export function useClipboard(): [CopiedValue, CopyFn] {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);

    const copy: CopyFn = useCallback(async (text) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');

            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);

            return true;
        } catch (error) {
            console.warn('Copy failed', error);
            setCopiedText(null);

            return false;
        }
    }, []);

    return [copiedText, copy];
}
