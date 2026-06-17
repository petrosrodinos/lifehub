import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Bookmark, Copy, MoreHorizontal } from 'lucide-react'
import {
  TRANSACTION_CARD_ACTIONS,
  TRANSACTION_CARD_ACTION_OPTIONS,
  type TransactionCardAction,
} from '../../../../config/constants/dropdowns/transaction-card-actions'

type TransactionActionsDropdownProps = {
  onDuplicate: () => void
  onCreatePreset: () => void
}

const ACTION_ICONS: Record<TransactionCardAction, typeof Copy> = {
  [TRANSACTION_CARD_ACTIONS.DUPLICATE]: Copy,
  [TRANSACTION_CARD_ACTIONS.CREATE_PRESET]: Bookmark,
}

type MenuPosition = {
  top: number
  left: number
}

export function TransactionActionsDropdown({ onDuplicate, onCreatePreset }: TransactionActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({ top: 0, left: 0 })
  const [isMenuReady, setIsMenuReady] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const updateMenuPosition = () => {
    const trigger = triggerRef.current
    const menu = menuRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const menuWidth = menu?.offsetWidth ?? 152
    const menuHeight = menu?.offsetHeight ?? 88
    const gap = 4
    const spaceBelow = window.innerHeight - rect.bottom
    const openUpward = spaceBelow < menuHeight + gap

    setMenuPosition({
      top: openUpward ? rect.top - menuHeight - gap : rect.bottom + gap,
      left: Math.max(8, rect.right - menuWidth),
    })
    setIsMenuReady(true)
  }

  useEffect(() => {
    if (!isOpen) {
      setIsMenuReady(false)
      return
    }

    const frame = requestAnimationFrame(() => {
      updateMenuPosition()
    })

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return
      }
      setIsOpen(false)
    }

    const handleReposition = () => {
      updateMenuPosition()
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleReposition, true)
    window.addEventListener('resize', handleReposition)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleReposition, true)
      window.removeEventListener('resize', handleReposition)
    }
  }, [isOpen])

  const handleAction = (action: TransactionCardAction) => {
    setIsOpen(false)

    if (action === TRANSACTION_CARD_ACTIONS.DUPLICATE) {
      onDuplicate()
      return
    }

    onCreatePreset()
  }

  const menu = isOpen
    ? createPortal(
        <div
          ref={menuRef}
          style={{ top: menuPosition.top, left: menuPosition.left }}
          className={`fixed z-[200] min-w-[9.5rem] overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xl ${isMenuReady ? 'visible' : 'invisible'}`}
        >
          {TRANSACTION_CARD_ACTION_OPTIONS.map((option) => {
            const Icon = ACTION_ICONS[option.value]

            return (
              <button
                key={option.value}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleAction(option.value)
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800"
              >
                <Icon className="w-4 h-4" />
                <span>{option.label}</span>
              </button>
            )
          })}
        </div>,
        document.body,
      )
    : null

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        className="p-1.5 text-slate-400 hover:text-violet-300 hover:bg-violet-500/15 rounded-md transition-colors"
        aria-label="Transaction actions"
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
      {menu}
    </>
  )
}
