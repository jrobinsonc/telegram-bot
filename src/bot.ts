import 'dotenv/config';
import { get } from 'lodash-es';
import { nanoid } from 'nanoid';
import { downloadFile } from './utils/download-file.js';
import { isPlainObject } from './utils/is-plain-object.js';
import { GetFileResponse, SendMessageResponse, TelegramApi } from './utils/telegram/api.js';
import { TelegramMessage } from './utils/telegram/types.js';

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramOwnerUsername = process.env.TELEGRAM_BOT_OWNER_USERNAME;

if (!telegramToken || !telegramOwnerUsername) {
  throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_BOT_OWNER_USERNAME in environment variables");
}

function isValidMessage(message: unknown): message is TelegramMessage {
  return isPlainObject(message) && typeof message.message_id === 'number';
}

function isValidUser(message: TelegramMessage): boolean {
  return message.from?.username === telegramOwnerUsername;
}

async function handleUserText(text: string): Promise<string> {
  return `💬 You said: "${text}"\n\nI'm echoing your message back to you!`
}

async function handleUserPhoto(photo: NonNullable<TelegramMessage['photo']>): Promise<string> {
  // Telegram sends photos in multiple sizes, the last one is the largest
  const highestResPhoto = photo.pop();

  if (highestResPhoto === undefined) {
    return '❌ Failed to process photo sizes';
  }

  const file: GetFileResponse = await telegramApi.getFile(highestResPhoto.file_id);

  if (file.ok === false) {
    return '❌ Failed to get file';
  }

  const fileUrl = `https://api.telegram.org/file/bot${telegramToken}/${file.result.file_path}`;
  const fileName = `${nanoid()}.${fileUrl.split('.').pop()?.toLowerCase()}`;
  const filePath = await downloadFile(fileUrl, { fileName });

  return `Yes, photo received: ${filePath}`;
}

async function handleUserMessage(message: TelegramMessage): Promise<string> {
  if (message.text !== undefined) {
    return await handleUserText(message.text)
  }

  if (message.photo !== undefined) {
    return await handleUserPhoto(message.photo)
  }

  throw new Error('Unknown message type');
}

const telegramApi = new TelegramApi(telegramToken);

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
    await handleUserMessage(message)
  );

  if (messageResult.ok === false) {
    throw new Error(`TelegramApi Error: ${messageResult.error_code} ${messageResult.description}`);
  }
}
