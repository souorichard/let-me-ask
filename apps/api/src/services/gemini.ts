import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcribe the audio following audio language and format rules. Be accurate and natural in your transcription. Maintain proper formatting and divide the text into paragraphs when optimized.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  })

  if (!response.text) {
    throw new Error('Failed to transcribe audio')
  }

  return response.text
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'gemini-embedding-001',
    contents: [{ text }],
    config: {
      taskType: 'retrieval-document',
    },
  })

  if (!response.embeddings?.[0].values) {
    throw new Error('Failed to generate embeddings')
  }

  return response.embeddings[0].values
}

export async function generateAnswer(
  question: string,
  transcriptions: string[],
) {
  const context = transcriptions.join('\n\n')

  const prompt = `
    Based on the text provided above as context, answer the following question with clarity and accuracy.

    Context:
    ${context}

    Question:
    ${question}

    Instructions:
    - Use only the information provided in the context to answer the question.
    - If the context does not contain enough information to answer the question, say "I don't know".
    - Be concise and to the point in your answer.
    - Be educated and polite in your response.
    - Tell relevant parts of the context if it is apropriate to answer the question.
    - If you mention any part of the context in your answer, use the term "class content".
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error('Failed to generate answer')
  }

  return response.text
}
