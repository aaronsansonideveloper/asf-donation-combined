import { IBaseModel } from './base';

export enum CategoryType {

  PRIME = 'prime',
  PARENT = 'parent',
  SUB = 'sub',
}

export interface ICategory extends IBaseModel{
  name: string;

  description: string;

  type: CategoryType;

  parent_id: number;

  prime_id: number;
}
