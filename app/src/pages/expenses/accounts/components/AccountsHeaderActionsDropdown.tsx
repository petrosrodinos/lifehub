import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, FolderTree, Plus } from 'lucide-react'
import {
  EXPENSE_ACCOUNTS_HEADER_ACTIONS,
  EXPENSE_ACCOUNTS_HEADER_ACTION_OPTIONS,
  type ExpenseAccountsHeaderAction,
} from '../../../../config/constants/dropdowns/expense-accounts-header-actions'

type AccountsHeaderActionsDropdownProps = {
  onCreateClick: () => void
  onCategoriesClick: () => void
}

const ACTION_ICONS: Record<ExpenseAccountsHeaderAction, typeof Plus> = {
  [EXPENSE_ACCOUNTS_HEADER_ACTIONS.NEW_ACCOUNT]: Plus,
  [EXPENSE_ACCOUNTS_HEADER_ACTIONS.MANAGE_CATEGORIES]: FolderTree,
}

type MenuPosition = {
  top: number
  left: number
}

export function AccountsHeaderActionsDropdown({
  onCreateClick,
  onCategoriesClick,
}: AccountsHeaderActionsDropdownProps) {
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
    const menuWidth = menu?.offsetWidth ?? 176
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

  const handleAction = (action: ExpenseAccountsHeaderAction) => {
    setIsOpen(false)

    if (action === EXPENSE_ACCOUNTS_HEADER_ACTIONS.NEW_ACCOUNT) {
      onCreateClick()
      return
    }

    onCategoriesClick()
  }

  const menu = isOpen
    ? createPortal(
        <div
          ref={menuRef}
          style={{ top: menuPosition.top, left: menuPosition.left }}
          className={`fixed z-[200] min-w-[11rem] overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xl ${isMenuReady ? 'visible' : 'invisible'}`}
        >
          {EXPENSE_ACCOUNTS_HEADER_ACTION_OPTIONS.map((option) => {
            const Icon = ACTION_ICONS[option.value]

            return (
              <button
                key={option.value}
                type="button"
                onClick={(e) => {
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
        className="flex items-center gap-2 px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors"
        aria-label="Account actions"
        aria-expanded={isOpen}
      >
        <Plus className="w-4 h-4" strokeWidth={2} />
        <span className="hidden sm:inline">New</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {menu}
    </>
  )
}
