/**
 * Dokumentasi: Komponen Skeleton
 * Deskripsi: Placeholder animasi "shimmer" untuk menunjukkan konten sedang dimuat.
 * Ketergantungan: util `cn`.
 * Model Pemakaian:
 * - `<Skeleton className="h-4 w-[250px]" />`
 */
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-primary/10 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
