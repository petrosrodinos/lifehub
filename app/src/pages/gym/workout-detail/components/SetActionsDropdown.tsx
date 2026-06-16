import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Copy, Edit2, Loader2, MoreHorizontal, Trash2 } from 'lucide-react'
import {
  WORKOUT_SET_ACTIONS,
  WORKOUT_SET_ACTION_OPTIONS,
  type WorkoutSetAction,
} from '../../../../config/constants/dropdowns/workout-set-actions'

type SetActionsDropdownProps = {
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
  isDuplicatePending?: boolean
}

const ACTION_ICONS: Record<WorkoutSetAction, typeof Edit2> = {
  [WORKOUT_SET_ACTIONS.EDIT]: Edit2,
  [WORKOUT_SET_ACTIONS.DUPLICATE]: Copy,
  [WORKOUT_SET_ACTIONS.DELETE]: Trash2,
}

type MenuPosition = {
  top: number
  left: number
}

export function SetActionsDropdown({
  onEdit,
  onDuplicate,
  onDelete,
  isDuplicatePending = false,
}: SetActionsDropdownProps) {
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
    const menuHeight = menu?.offsetHeight ?? 132
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

  useEffect(() => {
    if (!isOpen) return
    updateMenuPosition()
  }, [isOpen, isDuplicatePending])

  const handleAction = (action: WorkoutSetAction) => {
    setIsOpen(false)

    if (action === WORKOUT_SET_ACTIONS.EDIT) {
      onEdit()
      return
    }

    if (action === WORKOUT_SET_ACTIONS.DUPLICATE) {
      onDuplicate()
      return
    }

    onDelete()
  }

  const menu = isOpen
    ? createPortal(
        <div
          ref={menuRef}
          style={{ top: menuPosition.top, left: menuPosition.left }}
          className={`fixed z-[200] min-w-[9.5rem] overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xl ${isMenuReady ? 'visible' : 'invisible'}`}
        >
          {WORKOUT_SET_ACTION_OPTIONS.map((option) => {
            const Icon = ACTION_ICONS[option.value]
            const isDelete = option.value === WORKOUT_SET_ACTIONS.DELETE
            const isDuplicate = option.value === WORKOUT_SET_ACTIONS.DUPLICATE

            return (
              <button
                key={option.value}
                type="button"
                disabled={isDuplicate && isDuplicatePending}
                onClick={(e) => {
                  e.stopPropagation()
                  handleAction(option.value)
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  isDelete
                    ? 'text-red-400 hover:bg-red-500/10'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {isDuplicate && isDuplicatePending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
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
        className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-700 transition-colors"
        aria-label="Set actions"
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
      {menu}
    </>
  )
}
