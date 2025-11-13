/* Core */
import { type PayloadAction } from 'redux-eazy';

/* Instruments */
import storageHelper from 'src/common/utils/storageHelper';
import { IUser, UserProfile } from 'src/service/model';
import { createSlice } from 'src/service/setup';
import {
  ConnectionData,
  ConnectionItem,
  DataType,
  InvoiceItem,
  ProationPreview,
  Role,
  SliceState,
  SubscriptionData,
  ViewPermission,
} from './model';
import thunks from './thunks';
import { PageShape } from '../marketStore/model';

const initialState = (): SliceState => {
  return {
    loading: false,
    isPartner: false,
    token: storageHelper.getItem('ACCESS_TOKEN', 'local') || '',
    userInfo: null,
    userProfile: null,
    userProfileFromDeal: null,
    email_verified: false,
    email_verification_result: '',
    email_verification_resend: false,
    landing_temp_password: 'yghbnGTTV18dIM8314',
    changePasswordResponse: null,
    payUrl: '',
    invoiceList: [],
    subscriptionStatusData: null,
    billingPortalLink: null,
    preview_proation_amount: {
      current_plan_unused_credits: {
        amount: 0,
        currency: 'aud',
        desc: '',
      },
      updated_plan_prorated_amount: {
        amount: 0,
        currency: 'usd',
        desc: '',
      },
    },
    subscriptionUpdateResult: null,
    role: null,
    interactionConnectionList: [],
    interactionConnectionListPageData: {
      count: 0,
      page: 1,
      page_size: 6,
    },
    viewPermission: {
      email_permission: false,
      phone_permission: false,
    },
    connectionCount: 0,
    isShowConnectionMdal: false,
    connectionData: {
      userId: undefined,
      dealId: undefined,
      dealName: '',
      note: 'string',
    },
    dataType: 'view',
  };
};
export type AuthSlice = typeof authSlice;

const authSlice = createSlice({
  name: 'authStore',
  stateInit: initialState,
  reducers: {
    setSubscriptionUpdateResult(state, action: PayloadAction<'suceess' | 'fail' | null>) {
      state.subscriptionUpdateResult = action.payload;
    },
    setPreviewProationAmount(
      state,
      action: PayloadAction<{
        current_plan_unused_credits: ProationPreview;
        updated_plan_prorated_amount: ProationPreview;
      }>
    ) {
      state.preview_proation_amount = action.payload;
    },
    setBillingPortalLink(state, action: PayloadAction<string>) {
      state.billingPortalLink = action.payload;
    },
    setPayUrl(state, action: PayloadAction<string>) {
      state.payUrl = action.payload;
    },
    // 设置是否是
    setIsPartner(state, action: PayloadAction<boolean>) {
      state.isPartner = action.payload;
    },
    // 设置用户信息
    setToken: (state, action: PayloadAction<string | null>) => {
      const { payload } = action;
      if (payload && Object.values(payload).length) {
        state.token = payload;
        storageHelper.setItem('ACCESS_TOKEN', payload, 'local');
      } else {
        state.token = '';
        storageHelper.removeItem('ACCESS_TOKEN', 'local');
      }
    },
    setUserInfoMember: (state, action: PayloadAction<IUser>) => {
      const { payload } = action;
      state.userInfo = payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      const { payload } = action;
      state.userProfile = payload;
    },
    setUserProfileFromDeal: (state, action: PayloadAction<UserProfile>) => {
      const { payload } = action;
      state.userProfileFromDeal = payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      const { payload } = action;
      state.loading = payload;
    },
    setEmailVerified(state, action: PayloadAction<string>) {
      const { payload } = action;
      state.email_verification_result = payload;
    },

    setPasswordChangeResponse(state, action: PayloadAction<any>) {
      const { payload } = action;
      state.changePasswordResponse = payload;
    },
    setSubscriptionStatusData(state, action: PayloadAction<SubscriptionData>) {
      const { payload } = action;
      state.subscriptionStatusData = payload;
    },
    setInvoiceList(state, action: PayloadAction<InvoiceItem[]>) {
      const { payload } = action;
      state.invoiceList = payload;
    },
    setRole(state, actioon: PayloadAction<Role>) {
      state.role = actioon.payload;
    },
    setInteractionConnectionList(state, actioon: PayloadAction<ConnectionItem[]>) {
      state.interactionConnectionList = actioon.payload;
    },
    setInteractionConnectionListPageData(state, actioon: PayloadAction<Partial<PageShape>>) {
      state.interactionConnectionListPageData = {
        ...state.interactionConnectionListPageData,
        ...actioon.payload,
      };
    },
    setConnectionCount(state, action: PayloadAction<number>) {
      state.connectionCount = action.payload;
    },
    setIsShowConnectionMdal(state, action: PayloadAction<boolean>) {
      state.isShowConnectionMdal = action.payload;
    },
    setConnectionData(state, action: PayloadAction<Partial<ConnectionData>>) {
      state.connectionData = { ...state.connectionData, ...action.payload };
    },
    setViewPermission(state, action: PayloadAction<ViewPermission>) {
      state.viewPermission = action.payload;
    },
    setDataType(state, action: PayloadAction<DataType>) {
      state.dataType = action.payload;
    },
  },
  extraReducers: (builder) => {
    Object.values(thunks).forEach((thk) => {
      builder
        .addCase(thk.pending, (state) => {
          state.loading = true;
        })
        .addCase(thk.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(thk.rejected, (state, action) => {
          state.loading = false;
        });
    });
  },
});

export default authSlice;
