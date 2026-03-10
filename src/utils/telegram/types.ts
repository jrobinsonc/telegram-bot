// https://core.telegram.org/bots/api#user
export interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
}

// https://core.telegram.org/bots/api#photosize
export interface TelegramPhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size: number;
}

// https://core.telegram.org/bots/api#file
export interface TelegramFile {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  file_path?: string;
}

// https://core.telegram.org/bots/api#message
export interface TelegramMessage {
  message_id: number;
  chat: {
    id: number;
    type: string;
  };
  from?: TelegramUser;
  text?: string;
  photo?: TelegramPhotoSize[];
}

// https://core.telegram.org/bots/api#update
export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

// https://core.telegram.org/bots/api#webhookinfo
export interface WebhookInfo {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
  ip_address?: string;
  last_error_date?: number;
  last_error_message?: string;
  last_synchronization_error_date?: number;
  max_connections?: number;
  allowed_updates?: string[];
}

interface ApiResponseSuccess<TResult> {
  ok: true;
  result: TResult;
}

interface ApiResponseError {
  ok: false;
  error_code: number;
  description: string;
}

type ApiResponse<TResult> = ApiResponseSuccess<TResult> | ApiResponseError;

export type SendMessageResponse = ApiResponse<TelegramMessage>;
export type GetFileResponse = ApiResponse<TelegramFile>;
export type GetWebhookInfoResponse = ApiResponse<WebhookInfo>;
export type SetWebhookResponse = ApiResponse<true>;
