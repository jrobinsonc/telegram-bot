import Fastify from 'fastify'
import { handleUpdate } from './bot.js'
import { logger } from './utils/logger.js'

export const app = Fastify({ logger: process.env.NODE_ENV !== 'test' })

app.get('/', async function handler (request, reply) {
  return 'hello 👋🏻'
})

app.post('/telegram-webhook', async (request, reply) => {
  try {
    await handleUpdate(request.body);

    return { ok: true };
  } catch (error: unknown) {
    logger.error(error);

    return reply.status(500).send({ error: 'An error has occurred.' })
  }
})

if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: 3000 }, (err) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  })
}

