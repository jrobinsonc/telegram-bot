export interface SendMessageParams {
  business_connection_id?: string;
  chat_id: number | string;
  message_thread_id?: number;
  direct_messages_topic_id?: number;
  text: string;
  parse_mode?: string;
  entities?: MessageEntity[];
  link_preview_options?: LinkPreviewOptions;
  disable_notification?: boolean;
  protect_content?: boolean;
  allow_paid_broadcast?: boolean;
  message_effect_id?: string;
  suggested_post_parameters?: SuggestedPostParameters;
  reply_parameters?: ReplyParameters;
  reply_markup?:
    | InlineKeyboardMarkup
    | ReplyKeyboardMarkup
    | ReplyKeyboardRemove
    | ForceReply;
}

export interface Message {
  message_id: number;
  message_thread_id?: number;
  direct_messages_topic?: DirectMessagesTopic;
  from?: User;
  sender_chat?: Chat;
  sender_boost_count?: number;
  sender_business_bot?: User;
  sender_tag?: string;
  date: number;
  business_connection_id?: string;
  chat: Chat;
  forward_origin?: MessageOrigin;
  is_topic_message?: true;
  is_automatic_forward?: true;
  reply_to_message?: Message;
  external_reply?: ExternalReplyInfo;
  quote?: TextQuote;
  reply_to_story?: Story;
  reply_to_checklist_task_id?: number;
  via_bot?: User;
  edit_date?: number;
  has_protected_content?: true;
  is_from_offline?: true;
  is_paid_post?: true;
  media_group_id?: string;
  author_signature?: string;
  paid_star_count?: number;
  text?: string;
  entities?: MessageEntity[];
  link_preview_options?: LinkPreviewOptions;
  suggested_post_info?: SuggestedPostInfo;
  effect_id?: string;
  animation?: Animation;
  audio?: Audio;
  document?: Document;
  paid_media?: PaidMediaInfo;
  photo?: PhotoSize[];
  sticker?: Sticker;
  story?: Story;
  video?: Video;
  video_note?: VideoNote;
  voice?: Voice;
  caption?: string;
  caption_entities?: MessageEntity[];
  show_caption_above_media?: true;
  has_media_spoiler?: true;
  checklist?: Checklist;
  contact?: Contact;
  dice?: Dice;
  game?: Game;
  poll?: Poll;
  venue?: Venue;
  location?: Location;
  new_chat_members?: User[];
  left_chat_member?: User;
  chat_owner_left?: ChatOwnerLeft;
  chat_owner_changed?: ChatOwnerChanged;
  new_chat_title?: string;
  new_chat_photo?: PhotoSize[];
  delete_chat_photo?: true;
  group_chat_created?: true;
  supergroup_chat_created?: true;
  channel_chat_created?: true;
  message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged;
  migrate_to_chat_id?: number;
  migrate_from_chat_id?: number;
  pinned_message?: MaybeInaccessibleMessage;
  invoice?: Invoice;
  successful_payment?: SuccessfulPayment;
  refunded_payment?: RefundedPayment;
  users_shared?: UsersShared;
  chat_shared?: ChatShared;
  gift?: GiftInfo;
  unique_gift?: UniqueGiftInfo;
  gift_upgrade_sent?: GiftInfo;
  connected_website?: string;
  write_access_allowed?: WriteAccessAllowed;
  passport_data?: PassportData;
  proximity_alert_triggered?: ProximityAlertTriggered;
  boost_added?: ChatBoostAdded;
  chat_background_set?: ChatBackground;
  checklist_tasks_done?: ChecklistTasksDone;
  checklist_tasks_added?: ChecklistTasksAdded;
  direct_message_price_changed?: DirectMessagePriceChanged;
  forum_topic_created?: ForumTopicCreated;
  forum_topic_edited?: ForumTopicEdited;
  forum_topic_closed?: ForumTopicClosed;
  forum_topic_reopened?: ForumTopicReopened;
  general_forum_topic_hidden?: GeneralForumTopicHidden;
  general_forum_topic_unhidden?: GeneralForumTopicUnhidden;
  giveaway_created?: GiveawayCreated;
  giveaway?: Giveaway;
  giveaway_winners?: GiveawayWinners;
  giveaway_completed?: GiveawayCompleted;
  paid_message_price_changed?: PaidMessagePriceChanged;
  suggested_post_approved?: SuggestedPostApproved;
  suggested_post_approval_failed?: SuggestedPostApprovalFailed;
  suggested_post_declined?: SuggestedPostDeclined;
  suggested_post_paid?: SuggestedPostPaid;
  suggested_post_refunded?: SuggestedPostRefunded;
  video_chat_scheduled?: VideoChatScheduled;
  video_chat_started?: VideoChatStarted;
}

export interface MessageEntity {
  type: string;
  offset: number;
  length: number;
  url?: string;
  user?: User;
  language?: string;
  custom_emoji_id?: string;
  unix_time?: number;
  date_time_format?: string;
}

export interface LinkPreviewOptions {
  is_disabled?: boolean;
  url?: string;
  prefer_small_media?: boolean;
  prefer_large_media?: boolean;
  show_above_text?: boolean;
}

export interface SuggestedPostPrice {
  currency: string;
  amount: number;
}

export interface SuggestedPostInfo {
  state: string;
  price?: SuggestedPostPrice;
  send_date?: number;
}

export interface SuggestedPostParameters {
  price?: SuggestedPostPrice;
  send_date?: number;
}

export interface DirectMessagesTopic {
  // Minimal placeholder, as full definition is not required for sendMessage usage
  id?: number;
}

export interface ReplyParameters {
  message_id: number;
  chat_id?: number | string;
  allow_sending_without_reply?: boolean;
  quote?: string;
  quote_parse_mode?: string;
  quote_entities?: MessageEntity[];
  quote_position?: number;
  checklist_task_id?: number;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

export interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
}

export interface ReplyKeyboardMarkup {
  keyboard: KeyboardButton[][];
  is_persistent?: boolean;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
}

export interface KeyboardButton {
  text: string;
}

export interface ReplyKeyboardRemove {
  remove_keyboard: true;
  selective?: boolean;
}

export interface ForceReply {
  force_reply: true;
  input_field_placeholder?: string;
  selective?: boolean;
}

// Basic placeholder definitions for referenced types to satisfy TypeScript
export interface User {
  id: number;
  is_bot: boolean;
  first_name: string;
}

export interface Chat {
  id: number;
  type: string;
}

export interface MessageOrigin {
  type: string;
}

export interface ExternalReplyInfo {
  origin: MessageOrigin;
}

export interface TextQuote {
  text: string;
}

export interface Story {
  id: number;
}

export interface Animation {
  file_id: string;
}

export interface Audio {
  file_id: string;
}

export interface Document {
  file_id: string;
}

export interface PaidMediaInfo {
  star_count: number;
}

export interface PhotoSize {
  file_id: string;
  width: number;
  height: number;
}

export interface Sticker {
  file_id: string;
}

export interface Video {
  file_id: string;
  width: number;
  height: number;
  duration: number;
}

export interface VideoNote {
  file_id: string;
  length: number;
  duration: number;
}

export interface Voice {
  file_id: string;
  duration: number;
}

export interface Checklist {
  id: string;
}

export interface Contact {
  phone_number: string;
  first_name: string;
}

export interface Dice {
  emoji: string;
  value: number;
}

export interface Game {
  title: string;
}

export interface Poll {
  id: string;
}

export interface Venue {
  title: string;
  address: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ChatOwnerLeft {
  // marker object
}

export interface ChatOwnerChanged {
  // marker object
}

export interface MessageAutoDeleteTimerChanged {
  message_auto_delete_time: number;
}

export interface MaybeInaccessibleMessage {
  message_id: number;
}

export interface Invoice {
  title: string;
  description: string;
}

export interface SuccessfulPayment {
  telegram_payment_charge_id: string;
}

export interface RefundedPayment {
  telegram_payment_charge_id: string;
}

export interface UsersShared {
  // marker object
}

export interface ChatShared {
  // marker object
}

export interface GiftInfo {
  id: string;
}

export interface UniqueGiftInfo {
  id: string;
}

export interface WriteAccessAllowed {
  // marker object
}

export interface PassportData {
  // marker object
}

export interface ProximityAlertTriggered {
  // marker object
}

export interface ChatBoostAdded {
  // marker object
}

export interface ChatBackground {
  // marker object
}

export interface ChecklistTasksDone {
  // marker object
}

export interface ChecklistTasksAdded {
  // marker object
}

export interface DirectMessagePriceChanged {
  // marker object
}

export interface ForumTopicCreated {
  // marker object
}

export interface ForumTopicEdited {
  // marker object
}

export interface ForumTopicClosed {
  // marker object
}

export interface ForumTopicReopened {
  // marker object
}

export interface GeneralForumTopicHidden {
  // marker object
}

export interface GeneralForumTopicUnhidden {
  // marker object
}

export interface GiveawayCreated {
  // marker object
}

export interface Giveaway {
  // marker object
}

export interface GiveawayWinners {
  // marker object
}

export interface GiveawayCompleted {
  // marker object
}

export interface PaidMessagePriceChanged {
  // marker object
}

export interface SuggestedPostApproved {
  // marker object
}

export interface SuggestedPostApprovalFailed {
  // marker object
}

export interface SuggestedPostDeclined {
  // marker object
}

export interface SuggestedPostPaid {
  // marker object
}

export interface SuggestedPostRefunded {
  // marker object
}

export interface VideoChatScheduled {
  // marker object
}

export interface VideoChatStarted {
  // marker object
}
