import { api } from '@/lib/axios'

export interface getManagedRestaurantsResponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurants() {
  const response = await api.get<getManagedRestaurantsResponse>(
    '/managed-restaurant',
  )

  return response.data
}
