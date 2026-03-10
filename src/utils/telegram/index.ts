import { TelegramApi } from './api.js';

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

if (!telegramToken) {
  throw new Error('Missing TELEGRAM_BOT_TOKEN in environment variables');
}

export const telegramApi = new TelegramApi(telegramToken);
