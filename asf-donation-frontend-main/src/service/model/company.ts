import { IAddress } from "./user";
import { IBaseModel } from "./base";

export enum CompanyType {
  MEMBER = 'member',
  PARTNER = 'partner',
  MEMBER_DEFAULT = 'member_default',
}

export enum CompanyStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

export enum Employee {
  TENS = '1-10',
  FIFTYS = '11-50',
  HUNDREDS = '51-100',
  FIVEHUNDREDS = '101-500',
  THOUSANDS = '501-1000',
  MORE = '1000+',
}

export enum Organization {
  NATURAL_ENTITY = "NATURAL_ENTITY",
  SOLE_TRADER = "SOLE_TRADER",
  COMPANY = "COMPANY",
  GOVERNMENT = "GOVERNMENT",
  NONPROFIT = "NONPROFIT",
  RESEARCHER = "RESEARCHER",
  OTHER = "OTHER"
}

export interface ICompanyMetadata {
  logo?: string;
  banner?: string;
  website?: string;
  description?: string;
  address?: IAddress
}

export enum GeoScope {
  LOCAL = "LOCAL",
  REGION = "REGION",
  STATE = "STATE",
  NATIONAL = "NATIONAL",
}

export interface ICompanyPlan {
  geo_scope: GeoScope;
  geo_scope_detail: string;
  category_id: number; // category id
  sub_category_id: number; // sub category id
}

export interface ICompany extends IBaseModel {
  name: string;

  type: CompanyType;

  status: CompanyStatus;

  slug: string;

  abn: string;

  employee_count: Employee;

  organization_type: Organization;

  metadata?: ICompanyMetadata;

  plan?: ICompanyPlan;

  primary_user_id: number;

  tags?: Array<number>;
}
