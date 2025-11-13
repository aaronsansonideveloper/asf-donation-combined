import { IBaseModel } from "./base";

export interface IUserRequest extends IBaseModel{
  preference?: number;

  description?: string;

  content: string;

  deadline?: Date

  budget?: number;

  fileUrl?: string

  user_id: number

  user_email: string;
}