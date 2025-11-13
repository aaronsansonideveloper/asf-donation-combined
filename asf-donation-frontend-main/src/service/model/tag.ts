import { IBaseModel } from './base';

export enum tagType {
  USER = 'user',
  COMPANY = 'company',
  CATEGORY = 'category',
  OPPORTUNITY = 'opportunity',
  EMPTY = 'empty',
}

export interface ITag extends IBaseModel {
  name: string;

  description?: string;

  type: tagType;
}