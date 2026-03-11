import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import 'dotenv/config';
import process from 'process';

export const env = createEnv({
  server: {
    TELEGRAM_BOT_OWNER_USERNAME: z.string().min(1),
    TELEGRAM_BOT_TOKEN: z.string().min(1),
    PORT: z.coerce.number().default(3000),
    // https://github.com/pinojs/pino/blob/main/docs/api.md#loggerlevel-string-gettersetter
    LOG_LEVEL: z
      .enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'])
      .default('info'),
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('production'),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
