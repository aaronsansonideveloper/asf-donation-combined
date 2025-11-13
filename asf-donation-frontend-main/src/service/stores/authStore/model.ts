import { IUser, UserProfile } from 'src/service/model';
import { PageShape } from '../marketStore/model';

export interface SliceState {
  loading: boolean;
  isPartner: boolean;

  // user auth token
  token: string;
  userInfo: IUser | null;
  userProfile: UserProfile | null;
  userProfileFromDeal: UserProfile | null;
  email_verified: boolean;
  email_verification_result: string;
  email_verification_resend: boolean;

  // after change passwordAct is performed this is the response
  changePasswordResponse: any;

  landing_temp_password: string;
  // 付款地址
  payUrl: string;
  invoiceList: InvoiceItem[];
  subscriptionStatusData: SubscriptionData | null;
  billingPortalLink: string | null;
  preview_proation_amount: {
    current_plan_unused_credits: ProationPreview;
    updated_plan_prorated_amount: ProationPreview;
  };
  subscriptionUpdateResult: 'suceess' | 'fail' | null;

  role: Role | null;
  interactionConnectionList: ConnectionItem[];
  interactionConnectionListPageData: PageShape;
  viewPermission: ViewPermission;
  connectionCount: number;
  isShowConnectionMdal: boolean;
  connectionData: ConnectionData;
  dataType: DataType;
}
export type DataType = 'view' | 'like' | 'connection' | 'share' | 'profile';
export interface ConnectionData {
  userName?: string;
  userId: number | undefined;
  dealId: number | undefined;
  dealName: string;
  note: string;
  userRole?: RoleName;
  avatar?: string;
}
export type RoleName = 'pro' | 'premium' | 'free';
export interface Role {
  desc: string;
  id: number;
  name: RoleName;
}
export interface SubscriptionData {
  amount: string;
  cancel_at_period_end: boolean;
  created_at: string;
  deleted_at: string;
  end_at: string;
  id: number;
  interval: string;
  start_at: string;
  status: string;
  stripe_customer_id: string;
  stripe_price_id: string;
  stripe_subscription_id: string;
  schedule_object: any;
  subscription_item_object: object;
  type: string;
  updated_at: string;
  user_email: string;
  user_id: string;
}

export interface InvoiceItem {
  amount: string;
  created_at: string;
  currency: string;
  deleted_at: string;
  id: number;
  invoice_id: string;
  invoice_url: string;
  status: string;
  stripe_subscription_id: string;
  updated_at: string;
  user_id: string;
}

export interface PayApiReq {
  type: 'pro' | 'premium';
  interval: 'year' | 'month';
  success_url?: string;
  cancel_url?: string;
}

export interface PaymentVerifyReq {
  type: 'pro' | 'premium';
  interval: 'year' | 'month';
  current_user_id?: number;
}

export interface PermissionData {
  roles: Role[];
  permissions: string[];
  urls: string[];
  actions: string[];
}
export interface UpdatePermissionReq {
  phonePermission: boolean;
  emailPermission: boolean;
}

export interface QueryUserInteractionConnectionApiReq {
  id: string;
  interval: 'year' | 'month';
  page: number;
  page_size: number;
  type: string;
}

export interface ConnectionItem {
  viewer_id: number;
  deal_id: number;
  title: string;
  viewer_company: string;
  phone: string;
  connection: 'accept' | 'unaccept';
  first_name: string;
  last_name: string;
  email: string;
  clicked_user_id: string;
  timestamp: string;
  user_level: RoleName;
  metadata: {
    avatar: string;
  };
  avatar: string;
}

export interface ViewPermission {
  email_permission: boolean;
  phone_permission: boolean;
}
export interface ProationPreview {
  amount: number;
  currency: string;
  desc: string;
}

export interface FromInteractionApiReq {
  target_user_id: number;
  deal_id: number;
  note?: string;
}

export interface QueryUsersBaseInfoApiReq {
  ids: string[];
}

export interface NotificationVideoApiReq {
  /**
   * 当前用户访问的deal的id
   */
  deal_id: number;
  /**
   * 当前用户访问的deal的title
   */
  deal_title: string;
  /**
   * 这个是deal拥有者的user_id
   */
  deal_userId: number;
}
