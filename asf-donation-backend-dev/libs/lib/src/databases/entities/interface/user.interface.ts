import {IBaseEntity} from "./base.interface";

export interface IUserEntity extends IBaseEntity{
  email?: string;
  first_name?: string;
  last_name?: string;
  mobile?: string;
  group_id?: number;
  stripe_customer_id?: string;
  stripe_session_id?: string;
}