import { IBaseModel } from './base'

export enum UserEnquiryStatus {
  OPEN = 'open', // for user: "open enquiry", for partner: "new enquiry".
  CONNECTED = 'connected',
  FINISHED = 'finished',
  CLOSED = 'closed', // after six months, the enquiry will be automatically enlabelled as closed.

  LOST = 'lost', // todo: implement in the leads tracking CRON scheduling.
  ARCHIVED = 'archived',

  // todo: implement in the leads tracking CRON scheduling.  
  PENDING = 'pending', // not required, just for future use.
}

export interface IUserEnquiry extends IBaseModel {
  connected_at?: Date /// timeStamp, partner response

  finished_at?: Date // timeStampe, partner responses

  status: UserEnquiryStatus

  company: string // the company name will need the service

  title: string // the title of the enquiry

  content?: string // the content of the enquiry

  email: string // email of the enquiror, eg. user_email

  mobile: string // mobile of the enquiror

  opportunity_id: number

  user_id: number

  partner_name: string // the name of the partner who is handling the enquiry

  opportunity_name: string // the name of the opportunity

  opportunity_scaling_price: number // the price of the opportunity

  opportunity_postcode: string // the postcode of the opportunity  
}