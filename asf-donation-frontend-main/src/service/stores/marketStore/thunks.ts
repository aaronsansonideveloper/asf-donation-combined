/* Instruments */
import { dp, dpChain } from 'src/service';
import { QueryDealForMarketplace } from 'src/service/model';
import { createThunks } from 'src/service/setup';
import httpApi from './api';
import { ConversionFacebookClickParams, DealMarketplaceDefaultListApiReq } from './model';

const thunks = createThunks('marketStore', {
  // 市场 --- 搜索结果view的列表查询
  marketQueryListAct: async (searchParams: QueryDealForMarketplace, api) => {
    let params = searchParams || {};
    const { searchData, marketDealType, pageSize, dealMarketListPageNum } =
      api.getState().marketStore;
    if (marketDealType) {
      params.type = marketDealType;
    }
    if (searchData) {
      params.title = searchData;
    }
    const {
      data: { content, count },
    } = await httpApi.dealMarketplaceListApi({
      page_size: pageSize,
      page: dealMarketListPageNum,
      ...params,
    });
    dp('marketStore', 'setMarketList', content);
    dpChain('marketStore').setPageDataSearchPageData({
      count,
    });
  },
  dealMarketplaceDefaultListAct: async (searchParams: DealMarketplaceDefaultListApiReq, api) => {
    const { page: current = 1, page_size: pageSize = 16 } =
      api.getState().marketStore.pageDataDefaultView || {};
    const {
      data: { content, count },
    } = await httpApi.dealMarketplaceDefaultListApi({
      ...{ page: current, page_size: pageSize, ...searchParams },
    });
    const {
      premium_result = [],
      pro_result = [],
      free_result = [],
      page,
      page_size,
    } = content || {};
    dpChain('marketStore').setFreeList(free_result);
    dpChain('marketStore').setPremiumList(premium_result);
    dpChain('marketStore').setProList(pro_result);
    dpChain('marketStore').setPageDataDefaultPageData({
      count,
      page,
      page_size: page_size,
    });
  },

  // 首页的卡牌列表查询
  landingQueryListAct: async (searchParams: QueryDealForMarketplace, api) => {
    const {
      data: { content, counter },
    } = await httpApi.dealLandingPageListApi(searchParams);
    dp('marketStore', 'setLandingDealList', content);
    dp('marketStore', 'setLandingDealListCounter', counter);
  },
  conversionClickAct: async (params: ConversionFacebookClickParams, api) => {
    httpApi.conversionFacebookClick(params);
  },
});

export default thunks;
