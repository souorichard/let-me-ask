import { useMutation, useQueryClient } from '@tanstack/react-query'
import { env } from '@/env'
import type { CreateRoomRequest } from './types/create-room-request'
import type { CreateRoomResponse } from './types/create-room-response'

export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name, description }: CreateRoomRequest) => {
      const response = await fetch(`${env.VITE_API_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
        }),
      })

      const result: CreateRoomResponse = await response.json()

      return result
    },
    mutationKey: ['create-room'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
