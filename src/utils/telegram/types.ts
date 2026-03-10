// https://core.telegram.org/bots/api#user
export interface TelegramUser {
  id: number
  first_name: string
  username?: string
}

// https://core.telegram.org/bots/api#photosize
export interface TelegramPhotoSize {
  file_id: string
  file_unique_id: string
  width: number
  height: number
  file_size: number
}

// https://core.telegram.org/bots/api#file
export interface TelegramFile {
  file_id: string
  file_unique_id: string
  file_size?: number
  file_path?: string
}

// https://core.telegram.org/bots/api#message
export interface TelegramMessage {
  message_id: number
  chat: {
    id: number
    type: string
  }
  from?: TelegramUser
  text?: string
  photo?: TelegramPhotoSize[]
}

// https://core.telegram.org/bots/api#update
export interface TelegramUpdate {
  update_id: number
  message?: TelegramMessage
}
