import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { useCreateRoom } from '@/http/use-create-room'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Field, FieldError, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const createRoomSchema = z.object({
  name: z
    .string()
    .min(1, 'Room name is required')
    .min(3, 'Room name must be at least 3 characters'),
  description: z.string(),
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>

export function CreateRoomForm() {
  const queryClient = useQueryClient()

  const { mutateAsync: createRoom, isPending } = useCreateRoom()

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    await createRoom({ name, description })

    queryClient.invalidateQueries({ queryKey: ['rooms'] })

    createRoomForm.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create room</CardTitle>
        <CardDescription>
          Create a new room for start asking questions and receiving answers
          from the AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          className="flex flex-col gap-4"
        >
          <Controller
            control={createRoomForm.control}
            name="name"
            render={({ field }) => (
              <Field className="flex flex-col gap-2">
                <FieldLabel htmlFor="name">Room name</FieldLabel>
                <Input
                  id="name"
                  placeholder="Enter room name"
                  disabled={isPending}
                  {...field}
                />
                <FieldError>
                  {createRoomForm.formState.errors.name?.message}
                </FieldError>
              </Field>
            )}
          />
          <Controller
            control={createRoomForm.control}
            name="description"
            render={({ field }) => (
              <Field className="flex flex-col gap-2">
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea id="description" disabled={isPending} {...field} />
                <FieldError>
                  {createRoomForm.formState.errors.description?.message}
                </FieldError>
              </Field>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              'Create room'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
