import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ChatMessageImageProps {
    url: string
    alt: string
}

export function ChatMessageImage({ url, alt }: ChatMessageImageProps) {
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        if (!isFullscreen) {
            return undefined
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsFullscreen(false)
            }
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isFullscreen])

    const handleOpenFullscreen = () => {
        setIsFullscreen(true)
    }

    const handleCloseFullscreen = () => {
        setIsFullscreen(false)
    }

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleCloseFullscreen()
        }
    }

    return (
        <>
            <figure>
                <button
                    type="button"
                    onClick={handleOpenFullscreen}
                    aria-label="View image full screen"
                    className="block w-full cursor-zoom-in rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                    <img
                        src={url}
                        alt={alt}
                        className="w-full rounded-xl border border-slate-600/50 hover:opacity-95 transition-opacity"
                    />
                </button>
            </figure>

            {isFullscreen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
                        onClick={handleBackdropClick}
                    >
                        <button
                            type="button"
                            onClick={handleCloseFullscreen}
                            aria-label="Close full screen image"
                            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900/80 border border-slate-600/50 text-slate-200 hover:bg-slate-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img
                            src={url}
                            alt={alt}
                            className="max-h-full max-w-full object-contain rounded-xl"
                            onClick={(event) => event.stopPropagation()}
                        />
                    </div>,
                    document.body,
                )}
        </>
    )
}
