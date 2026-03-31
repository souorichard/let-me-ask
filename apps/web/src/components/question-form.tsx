import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useCreateQuestion } from '@/http/use-create-question'
import { Field, FieldError, FieldLabel } from './ui/field'

const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, 'Question is required')
    .min(10, 'Question must be at least 10 characters')
    .max(500, 'Question must be less than 500 characters'),
})

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>

interface QuestionFormProps {
  roomId: string
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const { mutateAsync: createQuestion } = useCreateQuestion(roomId)

  const createQuestionForm = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: '',
    },
  })

  const { isSubmitting } = createQuestionForm.formState

  async function handleCreateQuestion({ question }: CreateQuestionFormData) {
    await createQuestion({ question })

    createQuestionForm.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask a question</CardTitle>
        <CardDescription>
          Ask a question to receive an answer from the AI. You can ask about
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={createQuestionForm.handleSubmit(handleCreateQuestion)}
        >
          <Controller
            control={createQuestionForm.control}
            name="question"
            render={({ field }) => (
              <Field>
                <FieldLabel>Your question</FieldLabel>
                <Textarea
                  className="min-h-25"
                  placeholder="What you wanna ask?"
                  disabled={isSubmitting}
                  {...field}
                />
                <FieldError>
                  {createQuestionForm.formState.errors.question?.message}
                </FieldError>
              </Field>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send question'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
