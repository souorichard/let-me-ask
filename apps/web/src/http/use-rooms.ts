import { useQuery } from '@tanstack/react-query'
import { env } from '@/env'
import type { GetRoomsResponse } from './types/get-rooms-response'

export function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/rooms`)
      const result: GetRoomsResponse = await response.json()

      return result
    },
    refetchOnWindowFocus: false,
  })
}
