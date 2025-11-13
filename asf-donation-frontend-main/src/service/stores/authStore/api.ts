import { http } from 'src/http';
import { IUser, UserProfile } from 'src/service/model';
import {
  LoginApiRequest,
  LoginApiResponse,
  PartnerRegisterApiRequest,
  UpdateUserRequest,
  UserRegisterApiRequest,
} from '../../model/model';
import {
  ConnectionItem,
  FromInteractionApiReq,
  InvoiceItem,
  NotificationVideoApiReq,
  PayApiReq,
  PaymentVerifyReq,
  PermissionData,
  ProationPreview,
  QueryUserInteractionConnectionApiReq,
  QueryUsersBaseInfoApiReq,
  SubscriptionData,
  UpdatePermissionReq,
} from './model';

function login(params: LoginApiRequest) {
  let temp = {
    email: params.email,
    password: params.password,
  };
  return http.request<{ content: string }>({
    url: '/api/auth/login/local',
    method: 'POST',
    data: temp,
  });
}

function logout() {
  return http.request({
    url: '/api/auth/logout',
    method: 'POST',
  });
}

function registerUserApi(params: UserRegisterApiRequest) {
  return http.request<{ content: LoginApiResponse }>({
    url: '/api/auth/register/local/user',
    method: 'POST',
    data: params,
  });
}

function registerPartnerApi(params: PartnerRegisterApiRequest) {
  return http.request<{ content: LoginApiResponse }>({
    url: '/api/auth/register/local/partner',
    method: 'POST',
    data: params,
  });
}

function userInfoMemberApi() {
  return http.request<{ content: IUser }>({
    url: '/api/user/info/member',
    method: 'POST',
  });
}
function userUpdateApi(params: UpdateUserRequest) {
  return http.request({
    url: '/api/user/update',
    method: 'POST',
    data: params,
  });
}

function userProfileUpdateApi(params: UpdateUserRequest) {
  return http.request({
    url: '/api/user-profile/update',
    method: 'POST',
    data: params,
  });
}

function googleLogin(token: string) {
  return http.request<LoginApiResponse>({
    url: '/api/auth/login/google',
    method: 'POST',
    data: { token },
  });
}

function facebookLogin(payload: { name: string; id: string; email: string; avatar: string }) {
  return http.request<LoginApiResponse>({
    url: '/api/auth/login/facebook',
    method: 'POST',
    data: { ...payload },
  });
}

function emailVerificationApi(token: string) {
  return http.request({
    url: '/api/auth/email-verification',
    method: 'POST',
    data: { token },
  });
}

function tutorialCompleteApi() {
  return http.request({
    url: '/api/user/verify-tutorial',
    method: 'POST',
  });
}

function resendEmailTokenApi(email: string) {
  return http.request({
    url: '/api/auth/send-email-verification-token',
    method: 'POST',
    data: { email },
  });
}

function forgetPasswdApi(email: string) {
  return http.request({
    url: '/api/auth/password-reset',
    method: 'POST',
    data: { email },
  });
}

function changePasswdFromUserProfileApi(email: { old_password: string; new_password: string }) {
  return http.request({
    url: '/api/auth/change-password',
    method: 'POST',
    data: email,
  });
}

function changePasswdFromResetPasswdpageApi(email: { new_password: string; token: string }) {
  return http.request({
    url: '/api/auth/change-password-with-token',
    method: 'POST',
    data: email,
  });
}

const api = {
  logout,
  login,
  registerUserApi,
  registerPartnerApi,
  userInfoMemberApi,
  userUpdateApi,
  googleLogin,
  facebookLogin,
  emailVerificationApi,
  tutorialCompleteApi,
  resendEmailTokenApi,
  forgetPasswdApi,
  changePasswdFromUserProfileApi,
  changePasswdFromResetPasswdpageApi,
  userProfileUpdateApi,
  getUserProfile() {
    return http.request<{ content: UserProfile }>({
      url: '/api/user-profile/get',
      method: 'POST',
    });
  },
  getUserProfileFromDeal({ deal_id }: { deal_id: number }) {
    return http.request<{ content: UserProfile }>({
      url: '/api/user-profile/get-from-deal',
      method: 'POST',
      data: {
        id: deal_id,
      },
    });
  },
  getUserProfileFromConnection() {
    return http.request<{ content: UserProfile }>({
      url: '/api/user-profile/get-from-connection',
      method: 'POST',
    });
  },
  payApi(params: PayApiReq) {
    return http.request<{ content: string }>({
      url: '/api/payment/session/init',
      method: 'POST',
      data: params,
    });
  },
  payVerifyApi(params: PaymentVerifyReq) {
    return http.request<{ content: string }>({
      url: '/api/payment/session/init/verify',
      method: 'POST',
      data: params,
    });
  },
  // invoice tab 列表信息
  paymentSubscriptionHistoryApi() {
    return http.request<{ content: InvoiceItem[] }>({
      url: '/api/payment/subscription/history',
      method: 'POST',
    });
  },
  // Subscription tab 列表信息
  paymentSubscriptionStatusApi() {
    return http.request<{ content: SubscriptionData }>({
      url: '/api/payment/subscription/status',
      method: 'POST',
    });
  },
  // 获取Billing portal的link
  getBillingPortalLinkApi() {
    return http.request<{ content: string }>({
      url: '/api/payment/billing/portal',
      method: 'POST',
    });
  },
  // upgrade from premium to pro
  updateSubscriptionTypeApi(payload: { type: 'pro' | 'premium'; interval: 'month' | 'year' }) {
    return http.request<{ content: 'success' | 'fail' }>({
      url: '/api/payment/subscription/update',
      method: 'POST',
      data: payload,
    });
  },
  getProationPreviewAomuntApi(payload: { type: 'pro'; interval: 'month' | 'year' }) {
    return http.request<{
      content: {
        current_plan_unused_credits: ProationPreview;
        updated_plan_prorated_amount: ProationPreview;
      };
    }>({
      url: '/api/payment/subscription/update/amount-preview',
      method: 'POST',
      data: payload,
    });
  },
  // downgrade from pro to premium
  downgradeSubscriptionTypeApi(payload: { type: 'premium'; interval: 'month' | 'year' }) {
    return http.request<{ content: string }>({
      url: '/api/payment/subscription/update',
      method: 'POST',
      data: payload,
    });
  },
  changeSubscriptionIntervalApi(payload: { type: 'premium' | 'pro'; interval: 'month' | 'year' }) {
    return http.request<{ content: string }>({
      url: '/api/payment/subscription/change-interval',
      method: 'POST',
      data: payload,
    });
  },
  changeSubscriptionRollOverApi() {
    return http.request<{ content: string }>({
      url: '/api/payment/subscription/cancel',
      method: 'POST',
    });
  },
  cancelSubscriptionScheduleApi() {
    return http.request<{ content: string }>({
      url: '/api/payment/schedule/cancel',
      method: 'POST',
    });
  },
  getCurrentUserPermissionApi() {
    return http.request<{ content: PermissionData }>({
      url: '/api/rbac/current-user',
      method: 'POST',
    });
  },
  queryUserInteractionConnectionApi(params: QueryUserInteractionConnectionApiReq) {
    return http.request<{ content: ConnectionItem[]; count: number }>({
      url: '/api/statistics/query/user-interaction',
      method: 'POST',
      data: params,
    });
  },
  updatePermissionApi(params: UpdatePermissionReq) {
    return http.request<{ content: any }>({
      url: '/api/user-profile/update-view-permission',
      method: 'POST',
      data: params,
    });
  },
  getViewPermissionApi() {
    return http.request<{
      content: {
        email_permission: boolean;
        phone_permission: boolean;
      };
    }>({
      url: '/api/user-profile/get-view-permission',
      method: 'POST',
    });
  },
  queryConnectionCountApi() {
    return http.request<{
      content: {
        count: number;
      };
    }>({
      url: '/api/statistics/query/user-interaction/connection-count',
      method: 'POST',
    });
  },
  freeUserVideoRequestApi(params: { id: number }) {
    return http.request<{
      content: any;
    }>({
      url: '/api/deal/free-user-video-request',
      method: 'POST',
      data: params,
    });
  },
  fromInteractionApi(params: FromInteractionApiReq) {
    return http.request<{
      content: any;
    }>({
      url: '/api/connection/request/from_interaction',
      method: 'POST',
      data: params,
    });
  },
  queryUsersBaseInfoApi(params: QueryUsersBaseInfoApiReq) {
    return http.request<{
      content: any;
    }>({
      url: '/api/user/query/usersBaseInfo',
      method: 'POST',
      data: params,
    });
  },
  notificationVideoApi(params: NotificationVideoApiReq) {
    return http.request<{
      content: any;
    }>({
      url: '/api/notification/video',
      method: 'POST',
      data: params,
    });
  },
};

export default api;
