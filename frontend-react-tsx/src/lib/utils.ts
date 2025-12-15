import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { RouteDefinition } from "@/wayfinder"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function resolveUrl(href: string | RouteDefinition<any>) {
    return typeof href === "string" ? href : href.url
}

export function isSameUrl(currentPath: string, href: string | RouteDefinition<any>) {
    const a = (currentPath || "").replace(/\/+$/, "")
    const b = resolveUrl(href).replace(/\/+$/, "")
    return a === b
}
