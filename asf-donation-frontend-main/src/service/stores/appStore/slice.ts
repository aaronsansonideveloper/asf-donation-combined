/* Core */
import { PayloadAction } from 'redux-eazy';
import { createSlice } from 'src/service/setup';
import { ShowModalType, SliceState } from './model';
import storageHelper from 'src/common/utils/storageHelper';
import { RoleName } from '../authStore/model';

const initialState = (): SliceState => {
  return {
    isSearch: false,
    info: 'test',
    loading: false,
    currentVideoId: '',
    showModalType: '',
    modalData: {},
    isShowUpgrade: storageHelper.getItem('IS_SHOW_UP') == 1 || false,
    isShowUpgradeModal: false,
  };
};

const appSlice = createSlice({
  name: 'appStore',
  stateInit: initialState,
  reducers: {
    setIsSearch(state, action: PayloadAction<boolean>) {
      state.isSearch = action.payload;
    },
    setInfo(state, action: PayloadAction<string>) {
      state.info = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCurrentVideoId: (state, action: PayloadAction<string>) => {
      state.currentVideoId = action.payload;
    },
    setShowModalType: (
      state,
      action: PayloadAction<{
        type: ShowModalType;
        data?: {
          userId?: any;
          requestId?: any;
          userRole?: RoleName;
        };
      }>
    ) => {
      state.showModalType = action.payload.type;
      state.modalData = action.payload.data || {};
    },
    setModalData: (state, action: PayloadAction<any>) => {
      state.modalData = action.payload;
    },
    setIsShowUpgrade: (state, action: PayloadAction<boolean>) => {
      state.isShowUpgrade = action.payload;
      storageHelper.setItem('IS_SHOW_UP', action.payload ? 1 : 0);
    },
    setIsShowUpgradeModal: (state, action: PayloadAction<boolean>) => {
      state.isShowUpgradeModal = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export default appSlice;
