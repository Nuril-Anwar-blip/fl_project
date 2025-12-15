/**
 * Dokumentasi: Komponen Icon
 * Deskripsi: Pembungkus untuk ikon `lucide-react` agar konsisten pemakaian kelas.
 * Ketergantungan: `lucide-react`.
 * Model Pemakaian (React TS murni):
 * - <Icon iconNode={SomeLucideIcon} className="..." />
 * Catatan: Kompatibel penuh tanpa Laravel/Inertia.
 */
import type { LucideIcon } from 'lucide-react';

interface IconProps {
    iconNode?: LucideIcon | null;
    className?: string;
}

export function Icon({ iconNode: IconComponent, className }: IconProps) {
    if (!IconComponent) {
        return null;
    }

    return <IconComponent className={className} />;
}
