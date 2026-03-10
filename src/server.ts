import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
import { handleUpdate } from './bot.js'
import { logger } from './utils/logger.js'
import { telegramApi } from './utils/telegram/index.js'
import { GetWebhookInfoResponse } from './utils/telegram/types.js'

const app = Fastify({ logger: process.env.NODE_ENV !== 'test' })

app.get('/', async function handler() {
  return 'hello 👋🏻'
})

app.post('/telegram-webhook', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await handleUpdate(request.body);

    return { ok: true };
  } catch (error: unknown) {
    logger.error(error);

    return reply.status(500).send({ error: 'An error has occurred.' })
  }
})

app.get('/telegram-webhook', async () => {
  const webhookInfo: GetWebhookInfoResponse = await telegramApi.getWebhookInfo();

  if (webhookInfo.ok === true) {
    return webhookInfo.result.url;
  }

  return 'error';
});

app.get('/set-telegram-webhook', async (request: FastifyRequest) => {
  return telegramApi.setWebhook(`https://${request.host}/telegram-webhook`);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: 3000 }, (err) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  })
}

