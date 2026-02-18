import { X, AlertTriangle, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isPending?: boolean
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isPending = false,
}: ConfirmationModalProps) {
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

  const variantStyles = {
    danger: {
      icon: 'text-red-400',
      iconBg: 'bg-red-500/10',
      button: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: 'text-violet-400',
      iconBg: 'bg-violet-500/10',
      button: 'bg-violet-600 hover:bg-violet-700',
    },
    info: {
      icon: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
  }

  const styles = variantStyles[variant]

  const handleConfirm = () => {
    onConfirm()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
        onClick={handleBackdropClick}
      />
      <div
        className="fixed inset-0 flex items-center justify-center z-[10001] p-4"
        onClick={handleBackdropClick}
      >
        <div
          className="w-full max-w-md bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-6"
          role="dialog"
          aria-labelledby="confirmation-title"
          aria-describedby="confirmation-description"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-4">
            <div className={`shrink-0 w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center`}>
              <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 id="confirmation-title" className="text-lg font-semibold text-white">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isPending}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p id="confirmation-description" className="text-sm text-slate-300 mb-6">
                {description}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isPending}
                  className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isPending}
                  className={`flex-1 px-4 py-2.5 ${styles.button} text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}
