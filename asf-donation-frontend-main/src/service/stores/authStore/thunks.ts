/* Instruments */
import { dp, dpChain } from 'src/service';
import {
  LoginApiRequest,
  PartnerRegisterApiRequest,
  RegisterApiRequest,
  UserRegisterApiRequest,
} from 'src/service/model/model';
import { createThunks } from 'src/service/setup';
import httpApi from './api';
import {
  FromInteractionApiReq,
  NotificationVideoApiReq,
  PayApiReq,
  PaymentVerifyReq,
  QueryUserInteractionConnectionApiReq,
  QueryUsersBaseInfoApiReq,
  UpdatePermissionReq,
} from './model';

const thunks = createThunks('authStore', {
  loginAct: async (arg: LoginApiRequest, api) => {
    const {
      data: { content },
    } = await httpApi.login(arg);
    dp('authStore', 'setToken', content);
  },
  registerAct: async (arg: RegisterApiRequest, api) => {
    const { authStore } = api.getState();
    const { isPartner } = authStore;
    if (isPartner) {
      await httpApi.registerPartnerApi(arg as PartnerRegisterApiRequest);
    } else {
      await httpApi.registerUserApi(arg as UserRegisterApiRequest);
    }
  },
  logoutAct: async () => {
    dp('authStore', 'setToken', null);
    await httpApi.logout();
  },
  googleLoginAct: async (token: string, api) => {
    await httpApi.googleLogin(token);
    dp('authStore', 'setToken', token);
  },
  facebookLoginAct: async (
    payload: {
      id: string;
      email: string;
      name: string;
      avatar: string;
    },
    api
  ) => {
    const response = await httpApi.facebookLogin(payload);
    // @ts-ignore
    dp('authStore', 'setToken', response.data.content as string);
  },
  getUserProfile: async (_, api) => {
    const {
      data: { content },
    } = await httpApi.getUserProfile();
    dp('authStore', 'setUserProfile', content);
  },
  getUserProfileFromDeal: async (arg, api) => {
    const {
      data: { content },
    } = await httpApi.getUserProfileFromDeal(arg);
    dp('authStore', 'setUserProfileFromDeal', content);
  },
  getUserProfileFromConnection: async (_, api) => {
    const {
      data: { content },
    } = await httpApi.getUserProfile();
    dp('authStore', 'setUserProfile', content);
  },
  userInfoMemberAct: async (_, api) => {
    const {
      data: { content },
    } = await httpApi.userInfoMemberApi();
    dp('authStore', 'setUserInfoMember', content);
  },
  userUpdateAct: async (arg, api) => {
    await httpApi.userUpdateApi(arg);
  },
  userProfileUpdateAct: async (arg, api) => {
    await httpApi.userProfileUpdateApi(arg);
  },
  tutorialCompletedAct: async () => {
    await httpApi.tutorialCompleteApi();
  },
  emailVerificationAct: async (token: string, api) => {
    const {
      data: { content },
    } = await httpApi.emailVerificationApi(token);
    dp('authStore', 'setEmailVerified', content);
  },
  resendEmailVerificationAct: async (email: string, api) => {
    const {
      data: { content },
    } = await httpApi.resendEmailTokenApi(email);
    dp('authStore', 'setEmailVerified', content);
  },
  forgetPasswdAct: async (email: string) => {
    await httpApi.forgetPasswdApi(email);
  },
  changePasswdAct: async (email: { old_password: string; new_password: string }) => {
    await httpApi.changePasswdFromUserProfileApi(email);
  },
  changePasswdFromResetPasswdpageAct: async (email: { new_password: string; token: string }) => {
    const {
      data: { content },
    } = await httpApi.changePasswdFromResetPasswdpageApi(email);
    dp('authStore', 'setPasswordChangeResponse', content);
  },
  async payAct(params: PayApiReq) {
    const {
      data: { content },
    } = await httpApi.payApi(params);
    return {
      url: content,
    };
  },
  async paymentVerifyAct(params: PaymentVerifyReq) {
    await httpApi.payVerifyApi(params);
  },
  async paymentSubscriptionHistoryAct() {
    const {
      data: { content },
    } = await httpApi.paymentSubscriptionHistoryApi();
    dpChain('authStore').setInvoiceList(content);
  },
  async paymentSubscriptionStatusAct() {
    const {
      data: { content },
    } = await httpApi.paymentSubscriptionStatusApi();
    dpChain('authStore').setSubscriptionStatusData(content);
  },
  async upgradeSubscriptionTypeAct(payload: {
    type: 'pro' | 'premium';
    interval: 'month' | 'year';
  }) {
    const data = await httpApi.updateSubscriptionTypeApi(payload);
    return;
  },
  async changeSubscriptionIntervalAct(payload: {
    type: 'premium' | 'pro';
    interval: 'month' | 'year';
  }) {
    await httpApi.changeSubscriptionIntervalApi(payload);
    const {
      data: { content },
    } = await httpApi.paymentSubscriptionStatusApi();
    dpChain('authStore').setSubscriptionStatusData(content);
  },
  async getProationPreviewAct(payload: { type: 'pro'; interval: 'month' | 'year' }) {
    const {
      data: { content },
    } = await httpApi.getProationPreviewAomuntApi(payload);
    dpChain('authStore').setPreviewProationAmount(content);
  },
  async getBillingPortalLinkAct() {
    const {
      data: { content },
    } = await httpApi.getBillingPortalLinkApi();
    dpChain('authStore').setBillingPortalLink(content);
  },
  async changeSubscriptionRollOverAct() {
    await httpApi.changeSubscriptionRollOverApi();
  },
  async cancelSubscriptionScheduleAct() {
    await httpApi.cancelSubscriptionScheduleApi();
  },
  async getCurrentUserPermissionAct() {
    const {
      data: { content },
    } = await httpApi.getCurrentUserPermissionApi();
    dpChain('authStore').setRole(content.roles?.[0]);
  },
  // 请求interaction页面的connection
  async queryUserInteractionConnectionAct(params: QueryUserInteractionConnectionApiReq) {
    const {
      data: { content, count },
    } = await httpApi.queryUserInteractionConnectionApi(params);
    dpChain('authStore').setInteractionConnectionList(content);
    dpChain('authStore').setInteractionConnectionListPageData({
      count: count,
    });
  },
  async updatePermissionAct(params: UpdatePermissionReq) {
    await httpApi.updatePermissionApi(params);
  },
  async getViewPermissionAct() {
    const {
      data: { content },
    } = await httpApi.getViewPermissionApi();
    dpChain('authStore').setViewPermission(content);
  },
  async queryConnectionCountAct() {
    const {
      data: { content },
    } = await httpApi.queryConnectionCountApi();
    dpChain('authStore').setConnectionCount(content.count);
  },
  async freeUserVideoRequestAct(params: { id: number }) {
    const {
      data: { content },
    } = await httpApi.freeUserVideoRequestApi(params);
  },
  async fromInteractionAct(params: FromInteractionApiReq) {
    const {
      data: { content },
    } = await httpApi.fromInteractionApi(params);
  },
  async queryUsersBaseInfoAct(params: QueryUsersBaseInfoApiReq) {
    const {
      data: { content },
    } = await httpApi.queryUsersBaseInfoApi(params);
    return content;
  },
  async notificationVideoAct(params: NotificationVideoApiReq) {
    await httpApi.notificationVideoApi(params);
  },
});

export default thunks;
