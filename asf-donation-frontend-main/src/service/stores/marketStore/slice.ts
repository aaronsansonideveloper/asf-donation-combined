/* Core */
import { PayloadAction } from 'redux-eazy';
import { createSlice } from 'src/service/setup';
import { DealEntity, DealType } from 'src/types/deal';
import { PageShape, SliceState } from './model';
import thunks from './thunks';

/* Types */
const initialState = (): SliceState => {
  return {
    isLoading: false,
    searchPostCode: 0,
    postCode: 0,
    title: '',
    pageSize: 16,
    page: 1,
    searchData: '',
    marketDealType: DealType.ALL,
    // 首页-列表数据
    landingPageDealList: [],
    landingPageDealListCounter: 1,
    // 市场页-列表数据
    dealMarketList: [],
    //市场页-列表数据 上半部分
    dealPremiumList: [],
    dealFreeList: [],
    dealProList: [],
    dealMarketListPageNum: 1,
    dealMarketListCount: 0,
    pageDataSearchView: {
      page: 1,
      page_size: 16,
      count: 0,
    },
    pageDataDefaultView: {
      page: 1,
      page_size: 16,
      count: 0,
    },
  };
};

const marketSlice = createSlice({
  name: 'marketStore',
  stateInit: initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // 旧设计留下的字段 暂时不知道是否deprecated 留着吧
    setSearchPostCode(state, { payload }: PayloadAction<number | undefined>) {
      state.searchPostCode = payload;
    },
    setPostCode(state, { payload }: PayloadAction<number | undefined>) {
      state.postCode = payload;
    },
    // 第一阶段只需要Deal， 所以只需要Deal相关的字段
    setSeachParams(state, { payload }: PayloadAction<string>) {
      state.searchData = payload;
    },
    setMarketDealType(state, { payload }: PayloadAction<DealType | undefined>) {
      state.marketDealType = payload;
    },
    // 设置交易产品列表
    setMarketList: (state, action: PayloadAction<DealEntity[]>) => {
      const { payload } = action;
      state.dealMarketList = payload;
    },
    setFreeList: (state, action: PayloadAction<DealEntity[]>) => {
      const { payload } = action;
      state.dealFreeList = payload;
    },
    setPremiumList: (state, action: PayloadAction<DealEntity[]>) => {
      const { payload } = action;
      state.dealPremiumList = payload;
    },
    setProList(state, action: PayloadAction<DealEntity[]>) {
      const { payload } = action;
      state.dealProList = payload;
    },
    setPageDataDefaultPageData(state, action: PayloadAction<Partial<PageShape>>) {
      const { payload } = action;
      state.pageDataDefaultView = { ...state.pageDataDefaultView, ...payload };
    },
    setPageDataSearchPageData(state, action: PayloadAction<Partial<PageShape>>) {
      const { payload } = action;
      state.pageDataSearchView = { ...state.pageDataSearchView, ...payload };
    },
    setMarketListPageNum: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.pageDataSearchView = { ...state.pageDataSearchView, page: payload };
    },
    setLandingDealList: (state, action: PayloadAction<DealEntity[]>) => {
      const { payload } = action;
      state.landingPageDealList = payload;
    },
    setLandingDealListCounter: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.landingPageDealListCounter = payload;
    },
    resetSearchFilter(state) {
      state.searchData = '';
      state.marketDealType = DealType.ALL;
    },
    setIsloading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.marketQueryListAct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunks.marketQueryListAct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(thunks.marketQueryListAct.rejected, (state, action) => {
        state.isLoading = false;
      });
    builder
      .addCase(thunks.dealMarketplaceDefaultListAct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunks.dealMarketplaceDefaultListAct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(thunks.dealMarketplaceDefaultListAct.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default marketSlice;
