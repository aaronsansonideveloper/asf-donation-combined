import { IBaseModel } from './base';

export enum FeedbackType {
  CONNECTED = 'connected',
  FINISHED = 'finished',
}

export enum FeedbackOrderBy {
  TIME = 'time',
  QUANLITY = 'quanlity',
  COMMUNICATION = 'communication',
  SERVICE = 'service',
  GENERAL = 'general',
}

export interface IFeedback extends IBaseModel {
  type: FeedbackType;

  content: string

  quanlity: number; // service quality

  time: number; // response time

  communication: number; // communication rating

  service: number; // service rating

  general: number; // general rating

  user_id: number;

  opportunity_id: number;

  enquiry_id: number;

  user_email: string;

  opportunity_name: string;

  partner_name: string;

  opportunity_postcode: string // the postcode of the opportunity  

  opportunity_scaling_price: number // the price of the opportunity

  enquiry_created_at: Date // the time when the enquiry was created
}
