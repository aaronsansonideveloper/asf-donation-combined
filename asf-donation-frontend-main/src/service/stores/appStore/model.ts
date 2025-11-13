export type ShowModalType = 'CONNECTION' | 'DEAL_DETAIL' | 'COMING_SOON' | '';
/* Types */
export interface SliceState {
  isSearch: boolean;
  info: string;
  loading: boolean;
  currentVideoId: string;
  showModalType: ShowModalType;
  modalData: {
    userId?: any;
    requestId?: any;
  };
  isShowUpgrade: boolean;
  isShowUpgradeModal: boolean;
}
