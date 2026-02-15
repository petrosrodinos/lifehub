import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: ReactNode
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  headerActions?: ReactNode
  scrollable?: boolean
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  headerActions,
  scrollable = false,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]" 
        onClick={handleBackdropClick}
      />
      <div 
        className="fixed inset-0 flex items-center justify-center p-4 z-[9999]"
        onClick={handleBackdropClick}
      >
        <div
          className={`bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl ${sizeClasses[size]} w-full ${scrollable ? 'max-h-[calc(100vh-6rem)] flex flex-col' : ''}`}
          style={{
            animation: 'modalSlideIn 0.3s ease-out',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`flex items-center justify-between p-6 border-b border-slate-800 ${scrollable ? 'shrink-0' : ''}`}>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <div className="flex items-center gap-2">
              {headerActions}
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className={scrollable ? 'p-6 overflow-y-auto' : 'p-6'}>{children}</div>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  )
}
