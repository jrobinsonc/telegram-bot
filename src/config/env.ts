import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import 'dotenv/config';
import process from 'process';

export const env = createEnv({
  server: {
    TELEGRAM_BOT_OWNER_USERNAME: z.string().min(1),
    TELEGRAM_BOT_TOKEN: z.string().min(1),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
