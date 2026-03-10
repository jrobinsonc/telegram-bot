import Fastify from 'fastify'

export const app = Fastify({ logger: true })

app.get('/', async function handler (request, reply) {
  return 'hello 👋🏻'
})

app.post('/telegram-webhook', async (request, reply) => {
  try {
    const update: unknown = request.body

    // await handleUpdate(update)

    // res.status(200).json({ ok: true })
  } catch (error) {
    // logger.error('Error processing request:', error)
    // res.status(500).json({ error: 'Internal server error' })
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

