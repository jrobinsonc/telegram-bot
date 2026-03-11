import { pino } from 'pino';
import { env } from '../config/env.js';

export const loggerConfig = {
  level: env.LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      singleLine: true,
      colorize: true,
    },
  },
};

export const logger = pino(loggerConfig);
