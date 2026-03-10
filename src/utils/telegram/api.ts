import { jsonRequest } from "../request.js";
import { TelegramFile, TelegramMessage } from "./types.js";

interface ApiResponseSuccess<TResult> {
  ok: true,
  result: TResult
}

interface ApiResponseError {
  ok: false,
  error_code: number,
  description: string
}

type ApiResponse<TResult> = ApiResponseSuccess<TResult> | ApiResponseError;

export type SendMessageResponse = ApiResponse<TelegramMessage>;

export type GetFileResponse = ApiResponse<TelegramFile>;

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
   * @returns sendMessage endpoint result
   */
  async sendMessage(chatId: number, text: string): Promise<SendMessageResponse> {
    return jsonRequest('POST', `${this.apiUrl}/sendMessage`, {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
    });
  }

  /**
   * https://core.telegram.org/bots/api#getfile
   * @param fileId
   * @returns getFile endpoint result
   */
  async getFile(fileId: string): Promise<GetFileResponse> {
    return jsonRequest('GET', `${this.apiUrl}/getFile?file_id=${fileId}`);
  }
}
