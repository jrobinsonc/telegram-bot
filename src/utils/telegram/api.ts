import { makeJsonRequest } from '../request.js';
import type {
  GetFileResponse,
  GetWebhookInfoResponse,
  SendMessageResponse,
  SetWebhookResponse,
} from './types.js';

//TODO: Every time an endpoint is called, check if the response is structurally valid.
export class TelegramApi {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  private get apiUrl() {
    return `https://api.telegram.org/bot${this.token}`;
  }

  /**
   * https://core.telegram.org/bots/api#sendmessage
   * @param chatId
   * @param text
   * @returns sendMessage endpoint response
   */
  async sendMessage(
    chatId: number,
    text: string,
  ): Promise<SendMessageResponse> {
    return makeJsonRequest('POST', `${this.apiUrl}/sendMessage`, {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
    });
  }

  /**
   * https://core.telegram.org/bots/api#getfile
   * @param fileId
   * @returns getFile endpoint response
   */
  async getFile(fileId: string): Promise<GetFileResponse> {
    return makeJsonRequest('GET', `${this.apiUrl}/getFile?file_id=${fileId}`);
  }

  /**
   * https://core.telegram.org/bots/api#setwebhook
   * @param webhookUrl
   * @returns setWebhook endpoint response
   */
  async setWebhook(webhookUrl: string): Promise<SetWebhookResponse> {
    return makeJsonRequest('POST', `${this.apiUrl}/setWebhook`, {
      url: webhookUrl,
    });
  }

  /**
   * https://core.telegram.org/bots/api#getwebhookinfo
   * @returns getWebhookInfo endpoint response
   */
  async getWebhookInfo(): Promise<GetWebhookInfoResponse> {
    return makeJsonRequest('POST', `${this.apiUrl}/getWebhookInfo`);
  }
}
