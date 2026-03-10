import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

fastify.get('/', async function handler (request, reply) {
  return 'hello 👋🏻'
})

fastify.listen({ port: 3000 })
