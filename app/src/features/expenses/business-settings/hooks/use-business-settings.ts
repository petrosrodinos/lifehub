import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { UpdateBusinessSettingsDto } from '../interfaces/business-settings.interfaces'
import { getBusinessSettings, updateBusinessSettings } from '../services/business-settings'

const QUERY_KEYS = {
  businessSettings: ['business-settings'],
  expenseEntries: ['expense-entries'],
}

export function useBusinessSettings() {
  return useQuery({
    queryKey: QUERY_KEYS.businessSettings,
    queryFn: getBusinessSettings,
  })
}

export function useUpdateBusinessSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateBusinessSettingsDto) => updateBusinessSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.businessSettings })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
      toast.success('Business settings saved', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save business settings', { duration: 3000 })
    },
  })
}
