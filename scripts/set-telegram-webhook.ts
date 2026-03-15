import process from 'process';
import { env } from '../src/config/env.js';
import { telegramApi } from '../src/utils/telegram/index.js';
import type { SetWebhookResponse } from '../src/utils/telegram/types.js';

// pnpm tsx scripts/set-telegram-webhook.ts <app-url>

const main = async (): Promise<void> => {
  // const adminApiKey = env.ADMIN_API_KEY;
  const appUrl: string | undefined = process.argv[2];

  if (!appUrl) {
    console.error(
      '❌ Missing app URL. Provide it as the first CLI argument.\n' +
        'Example: pnpm tsx scripts/set-telegram-webhook.ts https://app-url.com',
    );
    process.exitCode = 1;

    return;
  }

  const normalizedAppUrl: string = appUrl.replace(/\/+$/, '');
  const webhookUrl: string = `${normalizedAppUrl}/telegram-webhook`;

  console.log(`\n► Setting Telegram webhook to ${webhookUrl}...`);

  const response: SetWebhookResponse = await telegramApi.setWebhook(
    webhookUrl,
    env.TELEGRAM_WEBHOOK_SECRET,
  );

  if (response.ok && response.result) {
    console.log(`\n✅ ${String(response.description)}`);
    process.exitCode = 0;

    return;
  }

  console.error('❌ The webhook could not be set.');
  process.exitCode = 1;
};

void main();
