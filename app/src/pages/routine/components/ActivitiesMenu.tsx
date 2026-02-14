import { useState, useEffect } from 'react'
import { X, ClipboardList, Edit2, Trash2, Loader2 } from 'lucide-react'
import { useActivities, useCreateActivity, useUpdateActivity, useDeleteActivity } from '../../../features/activities/hooks/use-activities'

type ActivitiesMenuProps = {
  isOpen: boolean
  onClose: () => void
}

const PRESET_COLORS = [
  '#f59e0b',
  '#0284c7',
  '#10b981',
  '#8b5cf6',
  '#f43f5e',
  '#f97316',
  '#dc2626',
  '#6366f1',
  '#14b8a6',
  '#eab308',
]

type ActivityFormProps = {
  initialName: string
  initialColor: string
  onSubmit: (name: string, color: string) => void
  onCancel: () => void
  submitLabel: string
  isPending?: boolean
}

function ActivityForm({
  initialName,
  initialColor,
  onSubmit,
  onCancel,
  submitLabel,
  isPending = false,
}: ActivityFormProps) {
  const [name, setName] = useState(initialName)
  const [color, setColor] = useState(initialColor)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed) {
      onSubmit(trimmed, color)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Activity name"
        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        autoFocus
        disabled={isPending}
      />
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            disabled={isPending}
            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
              color === c ? 'border-white scale-110' : 'border-slate-600'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        disabled={isPending}
        className="w-full h-10 cursor-pointer bg-slate-800 rounded disabled:opacity-50"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export function ActivitiesMenu({ isOpen, onClose }: ActivitiesMenuProps) {
  const { data: activities = [], isLoading } = useActivities()
  const createActivity = useCreateActivity()
  const updateActivity = useUpdateActivity()
  const deleteActivity = useDeleteActivity()

  const [editingUuid, setEditingUuid] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleAdd = (name: string, color: string) => {
    createActivity.mutate(
      { name, color },
      {
        onSuccess: () => {
          setIsAdding(false)
        },
      }
    )
  }

  const handleUpdate = (uuid: string, name: string, color: string) => {
    updateActivity.mutate(
      { uuid, data: { name, color } },
      {
        onSuccess: () => {
          setEditingUuid(null)
        },
      }
    )
  }

  const handleDelete = (uuid: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      deleteActivity.mutate(uuid)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <aside
        className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-slate-900 border-l border-slate-700 z-50 flex flex-col shadow-xl"
        role="dialog"
        aria-label="Activities menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Activities</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isAdding ? (
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <h3 className="text-sm font-medium text-slate-300 mb-3">Add activity</h3>
              <ActivityForm
                initialName=""
                initialColor={PRESET_COLORS[0]}
                onSubmit={handleAdd}
                onCancel={() => setIsAdding(false)}
                submitLabel="Add"
                isPending={createActivity.isPending}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors font-medium"
            >
              + Add activity
            </button>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-400">Your activities</h3>
            {isLoading ? (
              <div className="text-center py-8 text-slate-400">Loading activities...</div>
            ) : activities.length === 0 ? (
              <div className="text-center py-12">
                <ClipboardList className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                <p className="text-slate-400 mb-2">No activities yet</p>
                <p className="text-sm text-slate-500 mb-4">
                  Create your first activity to get started
                </p>
                <button
                  type="button"
                  onClick={() => setIsAdding(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                >
                  Create First Activity
                </button>
              </div>
            ) : (
              activities.map((activity) => (
                <div
                  key={activity.uuid}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700"
                >
                  {editingUuid === activity.uuid ? (
                    <div className="flex-1">
                      <ActivityForm
                        initialName={activity.name}
                        initialColor={activity.color}
                        onSubmit={(name, color) => handleUpdate(activity.uuid, name, color)}
                        onCancel={() => setEditingUuid(null)}
                        submitLabel="Save"
                        isPending={updateActivity.isPending}
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        className="w-8 h-8 rounded-lg shrink-0"
                        style={{ backgroundColor: activity.color }}
                      />
                      <span className="flex-1 text-white font-medium capitalize">
                        {activity.name}
                      </span>
                      {activity.is_default && (
                        <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                      {!activity.is_default && (
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingUuid(activity.uuid)}
                            className="p-2 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-700 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(activity.uuid)}
                            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
