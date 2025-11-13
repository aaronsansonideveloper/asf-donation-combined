import { UserEnquiryStatus } from "./user-enquiry";

export enum GeoScope {
  Local = 'LOCAL',
  National = 'NATIONAL',
  Region = 'REGION',
  State = 'STATE',
}

export enum Status {
  Active = 'active',
  Pending = 'pending',
  Rejected = 'rejected',
  Suspended = 'suspended',
}

/**
 * OpportunityEntity
 */
export interface OpportunityResponse {
  category_id: number;
  company_id: number;
  country: string;
  created_at: Date;
  deleted_at: Date;
  discount: number;
  geo_scope: GeoScope;
  id: number;
  marketPrice: number;
  pics: string[];
  postcode: string;
  priority: number;
  rating: number;
  region: string;
  reject_reason: string;
  scalingPrice: number;
  scalingPriceDesc: string;
  state: string;
  status: Status;
  tags?: string[];
  tier: number;
  title: string;
  updated_at: Date;
  value_driven: boolean;
  video: string;
}

/**
 * QueryOpportunityForMarketplaceDTO
 */
export interface QueryOpportunityRequest {
  categories?: number[];
  company_id?: number;
  created_at?: string[];
  deleted_at?: string[];
  geo_scope?: GeoScope;
  ids?: number[];
  national?: boolean;
  order?: { [key: string]: any };
  page?: number;
  page_size?: number;
  postcode?: number | undefined;
  rating?: number;
  region?: string;
  state?: string;
  tags?: string[];
  title?: string;
  updated_at?: string[];
  value_driven?: boolean;
}

export interface LoginApiRequest {
  email: string;
  password: string;
}

export interface PartnerRegisterApiRequest {
  companyName: string;
  email: string;
  first_name: string;
  last_name: string;
  mobile: string;
  password: string;
  
  source?: string | null;
  medium?: string | null;
  campaingn?: string | null;
  term?: string | null;
  advertisement?: string | null;
  link_id: string;
}

export interface UserRegisterApiRequest {
  email: string;
  password: string;
}

export type RegisterApiRequest = Partial<PartnerRegisterApiRequest & UserRegisterApiRequest>;

export interface LoginApiResponse {
  token: string;
}

/**
 * QueryGeoUnitDTO
 */
export interface QueryGeoRequest {
  local_government_area?: string;
  name?: string;
  order?: { [key: string]: any };
  postcode?: number;
  region?: string;
  state?: string;
}

/**
 * UpdateUserDTO
 */
export interface UpdateUserRequest {
  address?: { [key: string]: any };
  companies?: { [key: string]: any }[];
  company_id?: number;
  company_name?: string;
  created_at?: Date;
  deleted_at?: Date;
  email?: string;
  first_name?: string;
  hubspotId?: string;
  id: number;
  last_name?: string;
  metadata?: { [key: string]: any };
  mobile?: string;
  nick_name?: string;
  password?: string;
  postcode?: string;
  preferences?: number[];
  role?: Role;
  roles?: RoleEntity[];
  stripe_customer_id?: string;
  stripe_session_id?: string;
  stripe_subscription_id?: string;
  tags?: number[];
  updated_at?: Date;
  wishlist?: number[];
}

export enum Role {
  Admin = 'admin',
  Member = 'member',
  Partner = 'partner',
}

/**
 * UserEntity
 */
export interface UserEntity {
  address?: { [key: string]: any };
  companies?: { [key: string]: any }[];
  company_id?: number;
  company_name: string;
  created_at: Date;
  deleted_at: Date;
  email: string;
  first_name: string;
  hubspotId?: string;
  id: number;
  last_name: string;
  metadata?: { [key: string]: any };
  mobile?: string;
  nick_name: string;
  password: string;
  postcode?: string;
  preferences?: number[];
  role: Role;
  roles: RoleEntity[];
  stripe_customer_id?: string;
  stripe_session_id?: string;
  stripe_subscription_id?: string;
  sendbird_token: string;
  tags: number[];
  updated_at: Date;
  wishlist?: number[];

}

/**
 * PermissionEntity
 */
export interface PermissionEntity {
  created_at: Date;
  deleted_at: Date;
  id: number;
  name: string;
  rights: string[];
  role: RoleEntity;
  updated_at: Date;
}

/**
 * RoleEntity
 */
export interface RoleEntity {
  created_at: Date;
  deleted_at: Date;
  desc: string;
  id: number;
  name: string;
  permissions: PermissionEntity[];
  updated_at: Date;
  user: UserEntity;
}


/**
 * QueryUserEnquiryDTO
 */
export interface QueryUserEnquiryRequest {
  status: UserEnquiryStatus;
  opportunity_name: string;
  opportunity_ids: number[];
  include_deleted: boolean;
  created_at: [string, string];
  connected_at: [string, string];
  finished_at: [string, string];
  order: {
    connected_at: "ASC" | "DESC";
    finished_at: "ASC" | "DESC";
    status: "ASC" | "DESC";
    company: "ASC" | "DESC";
    opportunity_id: "ASC" | "DESC";
  }
} 