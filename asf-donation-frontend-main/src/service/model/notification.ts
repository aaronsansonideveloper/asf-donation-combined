import { IBaseModel } from './base';

export enum NotificationType {
  // platform related
  PLATFORM_ADVERTISEMENT = 'platform_advertisement',
  PLATFORM_ANNOUNCEMENT = 'platform_announcement',
  PLATFORM_NEWS = 'platform_news',
  PLATFORM_NEW_OPPORTUNITY = 'platform_new_opportunity',
  PLATFORM_NEW_DEAL = 'platform_new_deal',

  // member's deal related
  MEMBER_DEAL_PUBLISHED = 'platform_deal_published',
  MEMBER_DEAL_EXPIRED = 'platform_deal_expired',
  MEMBER_DEAL_ENQUIRY = 'platform_deal_enquiry',
  MEMBER_DEAL_LIKE = 'platform_deal_like', // when the current member's deal is liked
  MEMBER_DEAL_COMMENT = 'platform_deal_comment', // when the current member's deal is commented, or a reply is made on the current member's comment
  MEMBER_DEAL_COMMENT_LIKED = 'platform_deal_comment_liked', // when the current member's deal comment is liked

  // partner's opportunity related
  PARTNER_OPPORTUNITY_ENQUIRY = 'partner_opportunity_enquiry', // when the current partner's opportunity is enquired
  PARTNER_OPPORTUNITY_WISHED = 'partner_opportunity_like', // when the current partner's opportunity is wished
  PARTNER_OPPORTUNITY_REVIEW = 'partner_opportunity_review', // when the current partner's opportunity is reviewed after an enquiry is made

  // connection related
  CONNECTION_REQUEST = 'connection_request', // when a connection request is made
  CONNECTION_ACCEPTED = 'connection_accepted', // when a connection request is accepted
}

export interface INotification extends IBaseModel {
  Notification_type: NotificationType
  Notification_type_source_id: number;
  title: string;
  content: string;
  is_read: boolean;
  user_id: number;
  comment_place: number
}

export interface INotificationQueryParams { 
  
}