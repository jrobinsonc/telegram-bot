import { env } from '../../config/env.js';
import { TelegramApi } from './api.js';

export const telegramApi: TelegramApi = new TelegramApi(env.TELEGRAM_BOT_TOKEN);
