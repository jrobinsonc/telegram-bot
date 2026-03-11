import Fastify, {
  FastifyError,
  FastifyServerOptions,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';
import { handleUpdate } from './bot.js';
import { AppError } from './utils/error.js';
import { logger, loggerConfig } from './utils/logger.js';
import { telegramApi } from './utils/telegram/index.js';
import {
  GetWebhookInfoResponse,
  SetWebhookResponse,
} from './utils/telegram/types.js';

const serverOptions: FastifyServerOptions = {
  logger: loggerConfig,
  // Tells Fastify to trust the X-Forwarded-* headers set by a reverse proxy
  // (like nginx, Caddy, or a cloud load balancer such as Vercel/Railway/Render).
  trustProxy: true,
};
export const app = Fastify(serverOptions);

app.setNotFoundHandler({}, (_, reply: FastifyReply) => {
  reply.status(404).send({ error: 'Not found' });
});

app.setErrorHandler((error: FastifyError, _, reply: FastifyReply) => {
  let statusCode = 500;
  let message = 'An error has occurred.';

  if (AppError.is(error)) {
    statusCode = error.statusCode;
    message = error.message;
  }

  if (!AppError.is(error) || statusCode >= 500) {
    logger.error(error, message);
  } else if (statusCode >= 400) {
    logger.warn(error, message);
  }

  reply.status(statusCode).send({ error: message });
});

app.get('/', () => {
  return 'hello 👋🏻';
});

app.post('/telegram-webhook', async (request: FastifyRequest) => {
  await handleUpdate(request.body);

  return { data: 'ok' };
});

app.get('/telegram-webhook', async () => {
  const response: GetWebhookInfoResponse = await telegramApi.getWebhookInfo();

  if (response.ok) {
    let data: string = response.result.url;

    if (data === '') {
      data = 'The webhook has not been set up yet.';
    }

    return { data };
  }

  throw new AppError('badExternalServiceData', { cause: response });
});

app.get('/set-telegram-webhook', async (request: FastifyRequest) => {
  const response: SetWebhookResponse = await telegramApi.setWebhook(
    `https://${request.host}/telegram-webhook`,
  );

  if (response.ok && response.result) {
    return { data: response.description };
  }

  throw new AppError('badExternalServiceData', { cause: response });
});
