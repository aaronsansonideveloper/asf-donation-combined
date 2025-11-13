import { IBaseModel } from "./base";

export enum OpportunityStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}


export enum GeoScopeEnum {
  LOCAL = "LOCAL",
  REGION = "REGION",
  STATE = "STATE",
  NATIONAL = "NATIONAL",
}

export interface IOpportunity extends IBaseModel {
  title: string;
  value_driven: boolean;
  priority: number;
  tier: number;
  geo_scope: GeoScopeEnum;
  postcode: string;
  region: string;
  state: string;
  country: string;
  rating: number;
  status: OpportunityStatus
  rejected_reason: string;
  marketPrice: number;
  scalingPrice: number;
  scalingPriceDesc: string;
  discount: number;
  pics: string[];
  video?: string;
  tags?: string[];
  company_id?: number;
  category_id?: number;
  wished:boolean
}
