import { IBaseModel } from './base';

export interface IRole extends IBaseModel {
  name: string; // e.g. admin, member, partner

  desc: string
}