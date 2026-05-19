import {
  Bot,
  BookOpen,
  Calendar,
  CheckCircle,
  DollarSign,
  Dumbbell,
  Receipt,
  type LucideIcon,
} from 'lucide-react'

export type BottomNavTab = {
  id: string
  label: string
  path: string
  icon: LucideIcon
}

export const BOTTOM_NAV_PRIMARY_TABS = [
  {
    id: 'expenses',
    label: 'Expenses',
    path: '/dashboard/expenses',
    icon: DollarSign,
  },
  {
    id: 'gym',
    label: 'Gym',
    path: '/dashboard/gym',
    icon: Dumbbell,
  },
  {
    id: 'notes',
    label: 'Notes',
    path: '/dashboard/notes',
    icon: BookOpen,
  },
  {
    id: 'assistant',
    label: 'Assistant',
    path: '/dashboard/assistant',
    icon: Bot,
  },
] as const satisfies readonly BottomNavTab[]

export const BOTTOM_NAV_MORE_TABS = [
  {
    id: 'routine',
    label: 'Routine',
    path: '/dashboard/routine',
    icon: Calendar,
  },
  {
    id: 'habits',
    label: 'Habits',
    path: '/dashboard/habits',
    icon: CheckCircle,
  },
  {
    id: 'receipts',
    label: 'Receipts',
    path: '/dashboard/receipts',
    icon: Receipt,
  },
] as const satisfies readonly BottomNavTab[]
