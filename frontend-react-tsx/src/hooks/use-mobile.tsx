import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === "undefined") return false
        return window.innerWidth < MOBILE_BREAKPOINT
    })

    useEffect(() => {
        const media = window.matchMedia(
            `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
        )

        const update = () => {
            setIsMobile(media.matches)
        }

        // set nilai awal
        update()

        media.addEventListener("change", update)
        return () => media.removeEventListener("change", update)
    }, [])

    return isMobile
}
