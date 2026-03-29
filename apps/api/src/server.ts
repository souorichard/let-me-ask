import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { createQuestionsRoute } from './http/routes/create-question.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// -----------------------------------------------------------------------

app.get('/health', () => {
  return 'OK'
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestionsRoute)
app.register(createQuestionsRoute)

// -----------------------------------------------------------------------

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🔥 HTTP server running on http://localhost:${env.PORT}`)
    console.log(`📖 Docs available at http://localhost:${env.PORT}/docs`)
  })
