import { http } from 'src/http';
import { QueryDealForMarketplace } from 'src/service/model';
import { DealEntity } from 'src/types/deal';
import { ConversionFacebookClickParams, DealMarketplaceDefaultListApiRes } from './model';

// 市场 --- 用户默认view的列表查询
function defaultMarketQueryListAct(params: QueryDealForMarketplace) {
  return http.request<{
    content: {
      free_result: DealEntity[];
      pro_result: DealEntity[];
      premium_result: DealEntity[];
    };
    count: number
  }>({
    url: '/api/deal/query/marketplace/default',
    method: 'POST',
    data: { ...params },
  });
}

// 市场 --- 搜索结果列表
function dealMarketplaceListApi(params: QueryDealForMarketplace) {
  return http.request<{ content: DealEntity[]; count: number }>({
    url: '/api/deal/query/marketplace',
    method: 'POST',
    data: { ...params },
  });
}

function dealLandingPageListApi(params: QueryDealForMarketplace) {
  return http.request<{ content: DealEntity[]; counter: number }>({
    url: '/api/deal/query/public',
    method: 'POST',
    data: {
      ...params,
    },
  });
}

const api = {
  defaultMarketQueryListAct,
  dealMarketplaceListApi,
  dealLandingPageListApi,
  dealMarketplaceDefaultListApi(params: any) {
    return http.request<DealMarketplaceDefaultListApiRes>({
      url: '/api/deal/query/marketplace/default',
      method: 'POST',
      data: { ...params },
    });
  },
  conversionFacebookClick(params: ConversionFacebookClickParams) {
    //   console.log('trigger conversionFacebookClick', params);
    return http.request({
      url: '/api/conversion/facebook/click',
      method: 'POST',
      data: {
        ...params,
      },
    });
  },
};

export default api;
