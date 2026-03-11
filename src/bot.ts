import 'dotenv/config';
import { get, isPlainObject } from 'lodash-es';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { telegramApi } from './utils/telegram/index.js';
import type {
  GetFileResponse,
  SendMessageResponse,
  TelegramMessage,
  TelegramPhotoSize,
} from './utils/telegram/types.js';

function isValidMessage(message: unknown): message is TelegramMessage {
  return isPlainObject(message) && typeof message.message_id === 'number';
}

function isValidUser(message: TelegramMessage): boolean {
  return message.from?.username === env.TELEGRAM_BOT_OWNER_USERNAME;
}

async function handleUserText(text: string): Promise<string> {
  return Promise.resolve(
    `💬 You said: "${text}"\n\nI'm echoing your message back to you!`,
  );
}

async function handleUserPhoto(
  photo: NonNullable<TelegramMessage['photo']>,
): Promise<string> {
  // Telegram sends photos in multiple sizes, the last one is the largest
  const highestResPhoto: TelegramPhotoSize | undefined = photo.pop();

  if (highestResPhoto === undefined) {
    return '❌ Failed to process photo sizes';
  }

  const file: GetFileResponse = await telegramApi.getFile(
    highestResPhoto.file_id,
  );

  if (!file.ok) {
    return '❌ Failed to get file';
  }

  // const fileUrl = `https://api.telegram.org/file/bot${telegramToken}/${file.result.file_path}`;
  // const fileName = `${nanoid()}.${fileUrl.split('.').pop()?.toLowerCase()}`;
  // const filePath = await downloadFile(fileUrl, { fileName });

  return `Yes, photo received!`;
}

async function handleUserMessage(message: TelegramMessage): Promise<string> {
  if (message.text !== undefined) {
    return await handleUserText(message.text);
  }

  if (message.photo !== undefined) {
    return await handleUserPhoto(message.photo);
  }

  const logMessage: string = `Invalid message received: ${message.message_id.toString()}`;

  logger.warn(message, logMessage);

  return logMessage;
}

export async function handleUpdate(update: unknown): Promise<void> {
  const message: unknown = get(update, 'message');
  const chatId: unknown = get(message, 'chat.id');

  if (!isValidMessage(message) || typeof chatId !== 'number') {
    throw new Error('Invalid Telegram update');
  }

  if (!isValidUser(message)) {
    throw new Error('You are not authorized to use this bot');
  }

  const messageResult: SendMessageResponse = await telegramApi.sendMessage(
    chatId,
    await handleUserMessage(message),
  );

  if (!messageResult.ok) {
    throw new Error(
      `TelegramApi Error: ${messageResult.error_code.toString()} ${messageResult.description}`,
    );
  }
}
