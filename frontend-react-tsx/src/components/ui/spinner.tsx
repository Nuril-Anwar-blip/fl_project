/**
 * Dokumentasi: Komponen Spinner
 * Deskripsi: Indikator loading berputar sederhana menggunakan SVG.
 * Ketergantungan: util `cn`.
 * Fitur:
 * - Animasi spin CSS.
 * - Pewarnaan mengikuti `currentColor` teks.
 */
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
