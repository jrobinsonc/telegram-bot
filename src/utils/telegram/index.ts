import { env } from '../../config/env.js';
import { TelegramApi } from './api.js';

export const telegramApi = new TelegramApi(env.TELEGRAM_BOT_TOKEN);
