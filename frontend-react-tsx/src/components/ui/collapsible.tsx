/**
 * Dokumentasi: Komponen Collapsible
 * Deskripsi: Kontainer yang dapat dibuka/tutup untuk menyembunyikan konten.
 * Ketergantungan: `@radix-ui/react-collapsible`.
 * Model Pemakaian (React TS murni):
 * - <Collapsible> <CollapsibleTrigger>...</CollapsibleTrigger> <CollapsibleContent>...</CollapsibleContent> </Collapsible>
 * Catatan: UI-only, bebas dari Laravel/Inertia.
 */
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
