import Fastify, {
  FastifyServerOptions,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';
import { handleUpdate } from './bot.js';
import { logger } from './utils/logger.js';
import { telegramApi } from './utils/telegram/index.js';
import { GetWebhookInfoResponse } from './utils/telegram/types.js';
import { env } from './config/env.js';

const serverOptions: FastifyServerOptions = {
  logger: {
    level: env.LOG_LEVEL,
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
        colorize: true,
      },
    },
  },
  // Tells Fastify to trust the X-Forwarded-* headers set by a reverse proxy
  // (like nginx, Caddy, or a cloud load balancer such as Vercel/Railway/Render).
  trustProxy: true,
};
export const app = Fastify(serverOptions);

app.get('/', function handler() {
  return 'hello 👋🏻';
});

app.post(
  '/telegram-webhook',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await handleUpdate(request.body);

      return { ok: true };
    } catch (error: unknown) {
      logger.error(error);

      return reply.status(500).send({ error: 'An error has occurred.' });
    }
  },
);

app.get('/telegram-webhook', async () => {
  const webhookInfo: GetWebhookInfoResponse =
    await telegramApi.getWebhookInfo();

  if (webhookInfo.ok) {
    return webhookInfo.result.url;
  }

  return 'error';
});

app.get('/set-telegram-webhook', async (request: FastifyRequest) => {
  return telegramApi.setWebhook(`https://${request.host}/telegram-webhook`);
});
